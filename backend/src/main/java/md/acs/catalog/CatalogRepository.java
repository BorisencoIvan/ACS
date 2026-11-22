package md.acs.catalog;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

@Repository
public class CatalogRepository {

    private static final String PRODUCT_SELECT = """
            SELECT p.id, p.name, p.brand, p.category_id, c.group_id, c.label AS category_label,
                   p.price, p.stock, p.image_path, p.tone, p.badge, p.short_specs, p.keywords,
                   p.description, s.label AS spec_label, s.value AS spec_value
            FROM products p
            JOIN categories c ON c.id = p.category_id
            LEFT JOIN product_specs s ON s.product_id = p.id
            """;

    private static final String PRODUCT_ORDER = """
            ORDER BY p.sort_order, p.id, s.sort_order, s.label
            """;

    private static final ResultSetExtractor<List<Product>> PRODUCT_ROWS = CatalogRepository::readProducts;

    private final JdbcTemplate jdbc;

    public CatalogRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Catalog.Group> findGroups() {
        return jdbc.query("""
                SELECT id, label, icon
                FROM product_groups
                ORDER BY sort_order, id
                """, (row, rowNumber) -> new Catalog.Group(
                row.getString("id"), row.getString("label"), row.getString("icon")));
    }

    public List<Catalog.Category> findCategories() {
        return jdbc.query("""
                SELECT id, label, group_id
                FROM categories
                ORDER BY sort_order, id
                """, (row, rowNumber) -> new Catalog.Category(
                row.getString("id"), row.getString("label"), row.getString("group_id")));
    }

    public List<Product> findProducts() {
        return jdbc.query(PRODUCT_SELECT + PRODUCT_ORDER, PRODUCT_ROWS);
    }

    public Optional<Product> findProduct(String id) {
        return jdbc.query(PRODUCT_SELECT + "WHERE p.id = ?\n" + PRODUCT_ORDER, PRODUCT_ROWS, id)
                .stream()
                .findFirst();
    }

    private static List<Product> readProducts(ResultSet rows) throws SQLException {
        Map<String, Product> products = new LinkedHashMap<>();
        // После JOIN одна строка соответствует одной характеристике товара.
        while (rows.next()) {
            String id = rows.getString("id");
            Product product = products.get(id);
            if (product == null) {
                String name = rows.getString("name");
                product = new Product(
                        id, name, rows.getString("brand"), rows.getString("category_id"),
                        rows.getString("group_id"), rows.getString("category_label"),
                        rows.getBigDecimal("price"), rows.getInt("stock"), rows.getString("image_path"),
                        "Условная иллюстрация: " + name, rows.getString("tone"), rows.getString("badge"),
                        rows.getString("short_specs"), rows.getString("keywords"), rows.getString("description"),
                        new LinkedHashMap<>());
                products.put(id, product);
            }

            String specLabel = rows.getString("spec_label");
            if (specLabel != null) {
                product.specs().put(specLabel, rows.getString("spec_value"));
            }
        }

        return List.copyOf(products.values());
    }
}

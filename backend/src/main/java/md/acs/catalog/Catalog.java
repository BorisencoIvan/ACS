package md.acs.catalog;

import java.util.List;

public record Catalog(List<Group> groups, List<Category> categories, List<Product> products) {

    public record Group(String id, String label, String icon) {}

    public record Category(String id, String label, String group) {}
}

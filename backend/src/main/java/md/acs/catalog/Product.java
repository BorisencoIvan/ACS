package md.acs.catalog;

import java.math.BigDecimal;
import java.util.Map;

public record Product(
        String id,
        String name,
        String brand,
        String category,
        String group,
        String categoryLabel,
        BigDecimal price,
        int stock,
        String image,
        String imageAlt,
        String tone,
        String label,
        String shortSpecs,
        String keywords,
        String description,
        Map<String, String> specs
) {}

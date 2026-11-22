CREATE TABLE product_groups (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL REFERENCES product_groups (id),
    label TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE products (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES categories (id),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    image_path TEXT NOT NULL,
    tone TEXT NOT NULL DEFAULT 'mint',
    badge TEXT NOT NULL DEFAULT '',
    short_specs TEXT NOT NULL,
    keywords TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE product_specs (
    product_id TEXT NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id, label)
);

CREATE INDEX categories_group_idx ON categories (group_id);
CREATE INDEX products_category_idx ON products (category_id);

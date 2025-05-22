CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  image LONGBLOB
);

ALTER TABLE products
ADD COLUMN parent_id INT DEFAULT NULL,
ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES products(id);

-- const db = mysql.createConnection({
--   host: 'mysql-2ebaaef9-ecommerce-construction-1.c.aivencloud.com',
--   user: 'avnadmin',
--   password: 'AVNS_LDkcNv993LfkzZNEvkR',
--   database: 'defaultdb',
--   ssl: {
--     ca: fs.readFileSync('C:\E-commerce_Construction\ca.pem')  // Path to downloaded CA cert
--   }
-- });

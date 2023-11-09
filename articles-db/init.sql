-- articles-db/init.sql
CREATE TABLE article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(255) NOT NULL,
  prix DECIMAL(10, 2) NOT NULL
);

INSERT INTO article (libelle, prix) VALUES ('Artcile 1', 100.99);
INSERT INTO article (libelle, prix) VALUES ('Article 2', 198.99);
INSERT INTO article (libelle, prix) VALUES ('Artcile 3', 89.99);

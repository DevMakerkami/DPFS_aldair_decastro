-- Insertar categorías
INSERT INTO categories (name) VALUES 
('Platos principales'),
('Postres');

-- Insertar usuarios
INSERT INTO users (firstName, lastName, email, password, category, image) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'password123', 'Cliente', ' '),
('Aldair', 'De Castro', 'admin@delichoice.com', '123123123', 'Administrador', ' '),
('Carlos', 'Rodríguez', 'carlos.rodriguez@example.com', 'userpass789', 'Cliente', ' '),
('Ana', 'Martínez', 'ana.martinez@example.com', 'anapass101', 'Cliente', ' '),
('Luis', 'Sánchez', 'luis.sanchez@example.com', 'luisadmin202', 'Administrador', ' ');

-- Insertar productos
INSERT INTO products (name, description, price, image, category_id) VALUES
('Ensalada César', 'Clásica ensalada con lechuga romana, crutones, queso parmesano y aderezo César cremoso', 9.99, '/images/ensalada-cesar.jpg', 1),
('Salmón al horno', 'Filete de salmón fresco horneado a la perfección, servido con vegetales de temporada', 14.99, '/images/grilled-salmon.jpg', 1),
('Wrap de pollo', 'Tortilla de trigo rellena de pollo a la parrilla, lechuga, tomate y aderezo especial', 7.99, '/images/chicken-wrap.jpg', 1),
('Bowl de quinoa', 'Nutritivo bowl con quinoa, vegetales asados, aguacate y aderezo de limón', 10.99, '/images/quinoa.jpg', 1),
('Tacos al pastor', 'Auténticos tacos mexicanos con carne de cerdo marinada, piña, cebolla y cilantro', 13.99, '/images/tacos-pastor.jpg', 1),
('Paella', 'Tradicional plato español con arroz, azafrán, mariscos y pollo', 13.99, '/images/paella.jpg', 1),
('Lasaña', 'Capas de pasta, carne molida, salsa de tomate y queso gratinado', 12.99, '/images/lasaña.jpg', 1),
('Pad Thai', 'Fideos de arroz salteados con tofu, camarones, cacahuetes y brotes de soja', 11.99, '/images/pad-thai.jpg', 1),
('Flan de la casa', 'Suave y cremoso flan casero con caramelo y un toque de vainilla', 4.99, '/images/flan.jpg', 2),
('Cheesecake tradicional', 'Delicioso pastel de queso cremoso sobre base de galleta, con cobertura de frutos rojos', 4.99, '/images/cheesecake.jpg', 2);
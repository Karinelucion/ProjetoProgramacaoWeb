-- Inserts de exemplo para a tabela tb_categoria
INSERT INTO public.tb_categoria (nome) VALUES 
('Smartphones'),
('Eletrônicos'),
('Informática');

-- Inserts de exemplo para a tabela tb_produto, associando produtos às categorias criadas
INSERT INTO public.tb_produto (descricao, nome, preco, url_imagem, categoria_id) VALUES 
('Smartphone Samsung Galaxy S22 Ultra com 256GB de armazenamento, tela AMOLED de 6.8 polegadas, câmera traseira de 108MP e bateria de longa duração.', 'Samsung Galaxy S22 Ultra', 1999.99, 'https://example.com/samsung-galaxy-s22-ultra.jpg', 1),
('Smart TV LG OLED C1 de 65 polegadas com resolução 4K, tecnologia de inteligência artificial ThinQ AI, e suporte a HDR Dolby Vision e Dolby Atmos.', 'LG OLED C1 65"', 2499.99, 'https://example.com/lg-oled-c1-65-inch.jpg', 2),
('Notebook Dell XPS 15 com processador Intel Core i7 de 11ª geração, 16GB de RAM, SSD de 512GB e tela OLED de 15.6 polegadas.', 'Dell XPS 15', 1799.99, 'https://example.com/dell-xps-15.jpg', 3);

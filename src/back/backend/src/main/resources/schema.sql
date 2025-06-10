-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    motorista_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    nota INT NOT NULL,
    comentario VARCHAR(1000),
    data_avaliacao DATE NOT NULL,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criar tabela de motoristas
CREATE TABLE IF NOT EXISTS motoristas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    foto_url VARCHAR(255)
); 
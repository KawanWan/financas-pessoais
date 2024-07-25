-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/07/2024 às 03:02
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `financas_pessoais`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `movimentacoes`
--

CREATE TABLE `movimentacoes` (
  `id` int(11) NOT NULL,
  `descricao` varchar(191) NOT NULL,
  `valor` double NOT NULL,
  `tipo` varchar(191) NOT NULL,
  `data` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `categoria` varchar(191) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `movimentacoes`
--

INSERT INTO `movimentacoes` (`id`, `descricao`, `valor`, `tipo`, `data`, `categoria`, `userId`) VALUES
(1, 'aaa', 23, 'aaa', '2024-07-24 22:10:06.116', 'aaa', 1),
(2, 'aaa', 23, 'aaa', '2024-07-24 22:10:14.641', 'aaa', 1),
(3, 'salario', 15000, 'RECEITA', '2024-07-24 22:18:06.277', 'entrada', 1),
(4, 'celular', 1000, 'DESPESA', '2024-07-24 22:19:47.934', 'saida', 1),
(5, 'xiaomi', 10000, 'DESPESA', '2024-07-24 22:20:05.242', 'saida', 1),
(6, 'casa nova', 200000, 'DESPESA', '2024-07-24 22:27:43.549', 'saida', 1),
(7, 'salario', 1235456, 'RECEITA', '2024-07-24 22:28:10.914', 'entrada', 1),
(8, 'casa nova', 20000, 'DESPESA', '2024-07-24 22:28:33.876', 'saida', 1),
(9, 'salario', 456, 'RECEITA', '2024-07-24 22:39:09.533', 'entrada', 1),
(14, 'Sucesso', 123444, 'RECEITA', '2024-07-25 00:39:01.986', 'opa', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`) VALUES
(1, 'cleiton@gmail.com', 'cleiton', '$2b$10$dczoZfhLvw/w3DUguMpNjOA8dkfkcK8qHk8P4VakNBlhKO5DaEd4a'),
(2, 'pedro@gmail.com', 'Pedro', '$2b$10$SyZpsSPKMrijYcgL3ubkS.kWxOCO4tA0P/nFROwZi.xpiJCSngTYe');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b52aa2cc-31e6-4f7d-ade0-f75b69331b65', '774f22e26f9bb34261bf0f16bb8b81e60d97f87b39b666526513ef6dce0d4fb9', '2024-07-24 19:25:11.714', '20240724192511_movimentacoes', NULL, NULL, '2024-07-24 19:25:11.556', 1),
('cf77315e-e2db-43d5-a26a-52a752f6ef85', 'c0fb00fd0a6ed38bbddf8cdd72924dfff2c298a708ea98d54f0411be3cb20c97', '2024-07-24 22:09:15.209', '20240724220914_movimentacoes', NULL, NULL, '2024-07-24 22:09:15.029', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movimentacoes_userId_fkey` (`userId`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_key` (`email`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `movimentacoes`
--
ALTER TABLE `movimentacoes`
  ADD CONSTRAINT `movimentacoes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

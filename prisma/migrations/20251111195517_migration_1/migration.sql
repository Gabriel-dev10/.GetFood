-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NULL,
    `descricao` VARCHAR(155) NULL,
    `preco` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `imagem_url` VARCHAR(255) NULL,
    `categoria` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recompensas_disponiveis` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `pontos` INTEGER UNSIGNED NOT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,
    `data_criacao` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(12) NOT NULL,
    `nome` VARCHAR(60) NULL,
    `dataNascimento` DATE NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(64) NULL,
    `telefone` VARCHAR(45) NULL,
    `foto` VARCHAR(255) NULL,
    `status` VARCHAR(15) NOT NULL DEFAULT 'ATIVO',
    `dataUltimoAcesso` DATETIME(0) NULL,
    `dataUltimaModificacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `tokenSenha` VARCHAR(100) NULL,
    `dataSenha` TIMESTAMP(0) NULL,
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dataExclusao` TIMESTAMP(0) NULL,
    `pontos_total` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `email_verified` DATETIME(3) NULL,

    UNIQUE INDEX `token`(`token`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verificationtokens_token_key`(`token`),
    UNIQUE INDEX `verificationtokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conquistas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `icone` VARCHAR(50) NOT NULL,
    `pontos_necessarios` INTEGER UNSIGNED NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_conquistas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `conquista_id` INTEGER UNSIGNED NOT NULL,
    `desbloqueada` BOOLEAN NOT NULL DEFAULT false,
    `data_desbloqueio` TIMESTAMP(0) NULL,

    INDEX `idx_usuario_conquistas`(`usuario_id`),
    INDEX `idx_conquista`(`conquista_id`),
    UNIQUE INDEX `usuarios_conquistas_usuario_id_conquista_id_key`(`usuario_id`, `conquista_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,
    `criado_em` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `codigo`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividades_usuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `tipo_atividade` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `pontos_ganhos` INTEGER UNSIGNED NULL DEFAULT 0,
    `data_atividade` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_data_atividade`(`data_atividade`),
    INDEX `idx_tipo_atividade`(`tipo_atividade`),
    INDEX `idx_usuario_atividades`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estatisticas_usuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `total_qr_scans` INTEGER UNSIGNED NULL DEFAULT 0,
    `ultima_atividade` TIMESTAMP(0) NULL,
    `atualizado_em` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `usuario_id`(`usuario_id`),
    INDEX `idx_usuario_stats`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_scans` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `codigo_qr` VARCHAR(255) NOT NULL,
    `pontos_ganhos` INTEGER UNSIGNED NULL DEFAULT 10,
    `data_scan` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_data_scan`(`data_scan`),
    INDEX `idx_usuario_scans`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_session_token_key`(`session_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resgates` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `recompensa_id` INTEGER UNSIGNED NOT NULL,
    `data_resgate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_usuario_resgates`(`usuario_id`),
    INDEX `idx_recompensa_resgates`(`recompensa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios_conquistas` ADD CONSTRAINT `usuarios_conquistas_conquista_id_fkey` FOREIGN KEY (`conquista_id`) REFERENCES `conquistas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_conquistas` ADD CONSTRAINT `usuarios_conquistas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `atividades_usuario` ADD CONSTRAINT `atividades_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `estatisticas_usuario` ADD CONSTRAINT `estatisticas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `qr_scans` ADD CONSTRAINT `qr_scans_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgates` ADD CONSTRAINT `fk_recompensa_resgates` FOREIGN KEY (`recompensa_id`) REFERENCES `recompensas_disponiveis`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resgates` ADD CONSTRAINT `fk_usuario_resgates` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

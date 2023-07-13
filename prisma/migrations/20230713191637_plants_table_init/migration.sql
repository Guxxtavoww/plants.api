-- CreateTable
CREATE TABLE `Plant` (
    `plant_id` INTEGER NOT NULL AUTO_INCREMENT,
    `regular_name` VARCHAR(191) NOT NULL,
    `scientific_name` VARCHAR(191) NOT NULL,
    `sun_exposure` ENUM('high', 'medium', 'low', 'none') NOT NULL,
    `period` INTEGER NOT NULL,
    `water_level` INTEGER NOT NULL,
    `last_hydration` DATETIME(3) NOT NULL,
    `next_hydration` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Plant_regular_name_key`(`regular_name`),
    PRIMARY KEY (`plant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

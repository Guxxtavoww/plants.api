-- AlterTable
ALTER TABLE `Plant` MODIFY `scientific_name` VARCHAR(191) NULL,
    MODIFY `last_hydration` DATETIME(3) NULL,
    MODIFY `next_hydration` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from 'src/shared/modules/Database/database.service';

import {
  PlantType,
  plantSchema,
  plantResponseArraySchema,
  plantResponseSchema,
} from './plants.dto';

@Injectable()
export class PlantsService {
  constructor(private databaseService: DatabaseService) {}

  async listAllPlants() {
    const response = await this.databaseService.plant.findMany();

    const plants = plantResponseArraySchema.parse(response);

    return plants;
  }

  async getPlant(plant_id: number) {
    try {
      const plant = await this.databaseService.plant.findUnique({
        where: {
          plant_id,
        },
      });

      const plantResponse = plantResponseSchema.parse(plant);

      return plantResponse;
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to get single plant, ${err}`,
      );
    }
  }

  async createPlant(plantData: PlantType) {
    try {
      const next_hydration = new Date(Date.now());

      next_hydration.setDate(next_hydration.getDate() + 15);

      const createdPlant = await this.databaseService.plant.create({
        data: {
          last_hydration: null,
          next_hydration,
          period: plantData.period,
          regular_name: plantData.regular_name,
          sun_exposure: plantData.sun_exposure,
          water_level: plantData.water_level,
          scientific_name: plantData.scientific_name,
        },
      });

      const parsedData = plantResponseSchema.parse(createdPlant);

      return parsedData;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createManyPlants(plantsData: PlantType[]) {
    try {
      const next_hydration = new Date(Date.now());

      next_hydration.setDate(next_hydration.getDate() + 15);

      await this.databaseService.plant.createMany({
        data: plantsData.map((plant) => ({
          last_hydration: null,
          next_hydration,
          period: plant.period,
          regular_name: plant.regular_name,
          sun_exposure: plant.sun_exposure,
          water_level: plant.water_level,
          scientific_name: plant.scientific_name,
        })),
      });

      return Promise.resolve();
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed creating many plants, ${err}`,
      );
    }
  }

  async editPlant({ plant_id, ...updatedFields }: PlantType) {
    try {
      const editedPlant = await this.databaseService.plant.update({
        where: {
          plant_id,
        },
        data: {
          ...updatedFields,
        },
      });

      const newPlant = plantSchema.parse(editedPlant);

      return newPlant;
    } catch (err) {
      throw new InternalServerErrorException(`Failed updating plant, ${err}`);
    }
  }

  async deletePlant(plant_id: number): Promise<void> {
    try {
      await this.databaseService.plant.delete({
        where: {
          plant_id,
        },
      });

      return Promise.resolve();
    } catch (error) {
      throw new InternalServerErrorException(`Failed updating plant, ${error}`);
    }
  }
}

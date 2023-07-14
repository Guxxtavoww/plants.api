import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/modules/Database/database.service';

import { PlantType, plantArraySchema, plantSchema } from './plants.dto';

@Injectable()
export class PlantsService {
  constructor(private databaseService: DatabaseService) {}

  async listAllPlants() {
    const response = await this.databaseService.plant.findMany();

    const plants = plantArraySchema.parse(response);

    return plants;
  }

  async createPlant(plantData: PlantType) {
    try {
      const createdPlant = await this.databaseService.plant.create({
        data: {
          last_hydration: null,
          next_hydration: new Date(),
          period: plantData.period,
          regular_name: plantData.regular_name,
          sun_exposure: plantData.sun_exposure,
          water_level: plantData.water_level,
          scientific_name: plantData.scientific_name,
        },
      });

      const parsedData = plantSchema.parse(createdPlant);

      return parsedData;
    } catch (err) {
      throw new Error(err);
    }
  }
}

import { Injectable } from '@nestjs/common';

import { PlantType, plantArraySchema } from './plants.dto';

@Injectable()
export class PlantsService {
  constructor() {}

  async listAllPlants() {
    const response: PlantType[] = [
      {
        regular_name: 'Teste',
        scientific_name: 'Fodasis',
      },
    ];

    const plants = plantArraySchema.parse(response);

    return plants;
  }
}

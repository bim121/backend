import { Controller, Get } from '@nestjs/common';

@Controller('')
export class CityController {
  @Get()
  findAll(): string {
    return ;
  }
}
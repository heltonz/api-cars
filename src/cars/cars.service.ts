import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [];
  create(createCarDto: CreateCarDto) {
    const { brand, model, year } = createCarDto;
    const newCar = {
      id: this.cars.length + 1,
      brand,
      model,
      year,
    };
    this.cars.push(newCar);
    return { message: 'New Car created!', data: newCar };
  }

  findAll() {
    return { message: 'All cars avaible ', data: this.cars };
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException('Car not found');
    return { message: 'Car found!', data: car };
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);
    const { brand, model, year } = updateCarDto;
    const { data } = car;
    data.brand = brand;
    (data.model = model), (data.year = year);

    return { message: 'Car updated!', data: data };
  }

  remove(id: number) {
    this.findOne(id);
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars.splice(carIndex, 1);
    return `Car Deleted!`;
  }
}

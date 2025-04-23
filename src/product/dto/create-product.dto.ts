import { ProStatus } from '@prisma/client';

export class CreateProductDto {
  name: string;
  price: number;
  img: string;
  status: ProStatus;
}

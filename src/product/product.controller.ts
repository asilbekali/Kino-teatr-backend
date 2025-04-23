import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleDec } from 'src/user/decorator/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ProStatus, Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({
    description: 'Create Product',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Bread' },
        price: { type: 'number', example: 5000 },
        img: { type: 'string', example: 'photo.png' },
        status: { type: 'string', enum: ['OLD', 'NEW', 'USED'] },
      },
    },
  })
  
    create(@Body() createProductDto: CreateProductDto) {
      return this.productService.create(createProductDto);
    }
    

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = file.path; 
    return this.productService.uploadImg(+id, filePath);
  }
}

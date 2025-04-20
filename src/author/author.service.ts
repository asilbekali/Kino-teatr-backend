import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async create(createAuthorDto: CreateAuthorDto, file?: Express.Multer.File) {
    try {
      const author = new this.authorModel({
        name: createAuthorDto.name,
        image: file?.filename || null,
      });
      return await author.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.authorModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const author = await this.authorModel.findById(id);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return author;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
    file?: Express.Multer.File,
  ) {
    try {
      const updatedData = {
        ...updateAuthorDto,
        image: file?.filename || undefined,
      };

      const author = await this.authorModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      return author;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const author = await this.authorModel.findByIdAndDelete(id);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return { message: 'Author successfully deleted', author };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

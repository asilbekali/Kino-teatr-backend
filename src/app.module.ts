import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/film'), UserModule, FilmModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

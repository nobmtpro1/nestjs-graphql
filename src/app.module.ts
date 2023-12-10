import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsResolver } from './resolvers/author.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Post } from './entities/post.entity';
import { PostResolver } from './resolvers/post.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Author, Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Author, Post]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver, PostResolver],
})
export class AppModule {}

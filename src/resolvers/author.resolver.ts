import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Post } from 'src/entities/post.entity';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  @Query((returns) => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return await this.authorRepository.findOne({ where: { id } });
  }

  @ResolveField()
  async posts(@Parent() author) {
    const { id } = author;
    return this.postRepository.find({ where: { authorId: id } });
  }

  @Mutation((returns) => Author)
  async addAuthor(@Args({ name: 'name', type: () => String }) name: string) {
    return await this.authorRepository.save(
      plainToInstance(Author, {
        name: name,
      }),
      { reload: true },
    );
  }
}

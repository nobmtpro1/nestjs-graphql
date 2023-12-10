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
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Author } from 'src/entities/author.entity';
import { AddPostDto } from 'src/dtos/post.dto';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  @Query((returns) => [Post])
  async posts() {
    return await this.postRepository.find({});
  }

  @Query((returns) => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    return await this.postRepository.findOne({
      where: { id },
    });
  }

  @ResolveField()
  async author(@Parent() post) {
    const { authorId } = post;
    return this.authorRepository.findOne({ where: { id: authorId } });
  }

  @Mutation((returns) => Post)
  async addPost(@Args() args: AddPostDto) {
    const { title, content, authorId } = args;
    const post = await this.postRepository.save(
      plainToInstance(Post, {
        author: authorId ? plainToInstance(Author, { id: authorId }) : null,
        title,
        content,
      }),
      { reload: true },
    );
    return await this.postRepository.findOne({
      where: { id: post.id },
      relations: { author: true },
    });
  }
}

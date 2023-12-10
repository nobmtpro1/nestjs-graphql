import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
// import { Post } from './post';

@ObjectType()
@Entity({ name: 'author' })
export class Author {
  @Field((type) => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  name?: string;

  @Field((type) => [Post], { nullable: true, defaultValue: [] })
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}

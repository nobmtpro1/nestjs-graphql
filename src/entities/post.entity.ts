import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.entity';
// import { Post } from './post';

@ObjectType()
@Entity({ name: 'post' })
export class Post {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  title?: string;

  @Column()
  @Field({ nullable: true })
  content?: string;

  @JoinColumn({ name: 'authorId' })
  @Field((type) => Author, { nullable: true })
  @ManyToOne(() => Author, (author) => author.posts, { nullable: true })
  author: Author;

  @Field((type) => Number, { nullable: true })
  @Column({ nullable: true })
  authorId: number;
}

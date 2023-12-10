import { IsDefined, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class AddPostDto {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;

  @IsNumber()
  @Field({ nullable:true, defaultValue: 1 })
  @IsOptional()
  authorId?: number;
}

import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: "Post text must not be empty." })
  text: string;

  @IsOptional()
  @IsString()
  mediaUrl?: string;
}
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsArray()
  tags?: string[] = [];
  @IsOptional()
  @IsString()
  date?: string;
  @IsOptional()
  @IsBoolean()
  iscompleted: boolean = false;
  @IsNotEmpty()
  @IsNumber()
  list_id: number;
}

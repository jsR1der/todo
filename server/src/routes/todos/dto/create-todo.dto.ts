import {
  IsArray,
  IsBoolean,
  IsDate,
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
  @IsDate()
  date?: string;
  @IsBoolean()
  @IsOptional()
  iscompleted: boolean = false;
  @IsNotEmpty()
  @IsNumber()
  list_id: number;
}

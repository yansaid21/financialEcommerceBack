import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isIncome?: boolean;

  @IsOptional()
  @IsDateString()
  date?: string;
}

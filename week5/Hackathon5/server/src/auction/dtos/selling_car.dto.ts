import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  MinLength,
  MaxLength,
  IsArray,
  IsDateString,
} from 'class-validator';

// --- Main DTO ---
export class SellingCarDto {




  @IsEnum(['Dealer', 'Private party'])
  seller_type: 'Dealer' | 'Private party';

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  // Auction Info
  @IsDateString()
  startsAt: Date;

  @IsDateString()
  endsAt: Date;

  // @IsOptional()
  // @IsNumber()
  // reservePrice?: number;

  // @IsOptional()
  // @IsNumber()
  // totalBids?: number;

  // @IsOptional()
  // @IsNumber()
  // currentBidAmount?: number;

  // @IsOptional()
  // @IsMongoId()
  // currentLeader?: string;

  // @IsOptional()
  // @IsEnum(['draft', 'live', 'ended', 'sold'])
  // status?: 'draft' | 'live' | 'ended' | 'sold';

  // Car Info
  // @IsNotEmpty()
  // @IsString()
  // title: string;

  @IsOptional()
  make?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  // @IsNumber()
  year?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsNotEmpty()
  vin: string;

  @IsOptional()
  // @IsNumber()
  mileage?: string;

  @IsOptional()
  engine_size?: string;

  @IsNotEmpty()
  paint: string;

  @IsOptional()
  // @IsBoolean()
  has_gcc_specs?: string;

  @IsOptional()
  noteworthy_features?: string;

  @IsOptional()
  // @IsBoolean()
  accident_history?: string;

  @IsOptional()
  // @IsBoolean()
  service_history?: string;

  @IsNotEmpty()
  @IsEnum(['Completely stock', 'Modified'])
  modified_status: 'Completely stock' | 'Modified';

  @IsOptional()
  // @IsNumber()
  max_bid?: string;

  // @IsOptional()
  // @IsBoolean()
  // trending?: boolean;
}

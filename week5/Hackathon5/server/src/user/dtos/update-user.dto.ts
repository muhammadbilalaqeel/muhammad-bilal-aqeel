
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';


export class AddressDto {
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() address1?: string;
  @IsOptional() @IsString() address2?: string;
  @IsOptional() @IsString() landLineNumber?: string;
  @IsOptional() @IsString() poBox?: string;
}


export class TrafficFileDto {
  @IsOptional() @IsString() informationType?: string;
  @IsOptional() @IsString() trafficFileNumber?: string;
  @IsOptional() @IsString() plateNumber?: string;
  @IsOptional() @IsString() plateState?: string;
  @IsOptional() @IsString() plateCode?: string;
  @IsOptional() @IsString() driverLicenseNumber?: string;
  @IsOptional() @IsString() issueCity?: string;
}

export class UpdateUserDto {
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() mobileNumber?: string;
  @IsOptional() @IsString() nationality?: string;
  @IsOptional() @IsString() idType?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TrafficFileDto)
  trafficFile?: TrafficFileDto;
}

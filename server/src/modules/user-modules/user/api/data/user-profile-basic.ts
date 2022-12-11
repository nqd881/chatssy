import { ApiProperty } from '@nestjs/swagger';

export class ApiDataAddress {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  streetLine1: string;

  @ApiProperty()
  streetLine2: string;

  @ApiProperty()
  postalCode: string;
}

export class ApiDataUserProfile {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  address: ApiDataAddress;
}

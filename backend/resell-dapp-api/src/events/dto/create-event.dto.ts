import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  artistAddress: string;
  @ApiProperty()
  eventDate: string;
  @ApiProperty()
  feePercentage: string;
}

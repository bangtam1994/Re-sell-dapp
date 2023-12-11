import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  contractAddress: string;
  @ApiProperty()
  artistAddress: string;
  @ApiProperty()
  artistName: string;
  @ApiProperty()
  eventDate: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  quantity: number;
}

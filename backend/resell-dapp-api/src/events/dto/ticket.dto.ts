import { ApiProperty } from '@nestjs/swagger';

export class TicketDto {
  @ApiProperty()
  ticket_address: string;
  @ApiProperty()
  owner_address: string;
  @ApiProperty()
  onSale: boolean;
  @ApiProperty()
  price: number;
  @ApiProperty()
  date: string;
}

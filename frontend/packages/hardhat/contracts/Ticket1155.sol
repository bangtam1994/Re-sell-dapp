// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Ticket is ERC1155 {
	uint256 public constant TYPE1 = 0;
	string public constant EVENT_NAME;
	string public constant EVENT_DATE;
	uint256 public constant TICKET_PRICE;
	uint256 public ticketQuantity;
	string public constant ARTIST_NAME;
	address public constant ARTIST_ADDRESS;

	constructor(
		string memory _eventName,
		string memory _eventDate,
		uint256 _ticketPrice,
		uint256 _ticketQuantity,
		string memory _artistName,
		address _artistAddress
	) ERC1155("Your_URI_Here") {
		EVENT_NAME = _eventName;
		EVENT_DATE = _eventDate;
		TICKET_PRICE = _ticketPrice;
		ticketQuantity = _ticketQuantity;
		ARTIST_NAME = _artistName;
		ARTIST_ADDRESS = _artistAddress;
	}

	function mint(uint256 amount) external payable {
		require(amount <= ticketQuantity, "Too many tickets requested");
		require(msg.value >= amount * TICKET_PRICE, "Insufficient funds sent");

		ticketQuantity -= amount;
		_mint(msg.sender, TYPE1, amount, "");

		if (msg.value > amount * TICKET_PRICE) {
			payable(msg.sender).transfer(msg.value - (amount * TICKET_PRICE));
		}
	}
}

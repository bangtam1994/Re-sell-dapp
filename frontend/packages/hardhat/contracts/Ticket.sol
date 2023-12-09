// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// import "@openzeppelin/contracts/access/AccessControl.sol";

contract Ticket is ERC1155 {
	uint256 public constant TYPE1 = 0;
	string public eventName;
	string public eventDate;
	uint256 public ticketPrice;
	uint256 public ticketQuantity;
	string public artistName;
	address public artistAddress;

	constructor(
		string memory _eventName,
		string memory _eventDate,
		uint256 _ticketPrice,
		uint256 _ticketQuantity,
		string memory _artistName,
		address _artistAddress
	) ERC1155 {
		eventName = _eventName;
		eventDate = _eventDate;
		ticketPrice = _ticketPrice;
		ticketQuantity = _ticketQuantity;
		artistName = _artistName;
		artistAddress = _artistAddress;
	}

	function mint(
		address account,
		uint256 amount,
	) public {
		require(
			amount <= ticketQuantity,
			"Too many tickets requested"
		);
		_mint(account, TYPE1, amount, "");
		// e.g. _mint(0x..., 0, 3, "");
	}


}

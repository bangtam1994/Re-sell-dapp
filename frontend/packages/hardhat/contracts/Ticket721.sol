// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ticket is ERC721 {
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
	) ERC721("Ticket", "RSL") {
		EVENT_NAME = _eventName;
		EVENT_DATE = _eventDate;
		TICKET_PRICE = _ticketPrice;
		ticketQuantity = _ticketQuantity;
		ARTIST_NAME = _artistName;
		ARTIST_ADDRESS = _artistAddress;
	}

  function safeMint(
        address to,
        uint256 tokenId
    ) external payable {
        require(ticketQuantity > 0, "No more tickets available")
        require(msg.value >= TICKET_PRICE, "Insufficient funds sent");
        ticketQuantity -= 1;
        _safeMint(to, tokenId);
        if (msg.value > TICKET_PRICE) {
            payable(msg.sender).transfer(msg.value - TICKET_PRICE);
        }
  }

	// The following functions are overrides required by Solidity.
	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
}

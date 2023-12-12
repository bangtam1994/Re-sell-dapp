// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Event is ERC721 {
	uint256 public constant TYPE1 = 0;
	string public eventName;
	string public eventDate;
	uint256 public ticketPrice;
	uint256 public ticketQuantity;
	string public artistName;
	uint256[] public onSale;
	address public eventCreator;
	uint256 public royalty;

	constructor(
		string memory _eventName,
		string memory _eventDate,
		uint256 _ticketPrice,
		uint256 _ticketQuantity,
		string memory _artistName,
		uint256 _royalty
	) ERC721("Ticket", "RSL") {
		eventName = _eventName;
		eventDate = _eventDate;
		ticketPrice = _ticketPrice;
		ticketQuantity = _ticketQuantity;
		artistName = _artistName;
		royalty = _royalty;
		eventCreator = msg.sender;
	}

	function buy(uint256 nftId) external payable {
		require(
			ticketQuantity > 0 || onSale.length > 0, // changed this
			"No more tickets available"
		);
		require(msg.value >= ticketPrice, "Insufficient funds sent");
		if (ticketQuantity > 0) {
			ticketQuantity -= 1;
			// why is the balanceOf increased?
			payable(eventCreator).transfer(ticketPrice);
			_safeMint(msg.sender, nftId);
			if (msg.value > ticketPrice) {
				payable(msg.sender).transfer(msg.value - ticketPrice);
			}
		} else {
			uint256 nftIdOnSale = onSale[0];
			updateOnSale();
			payable(eventCreator).transfer(royaltyCalculation());
			_safeTransfer(ownerOf(nftIdOnSale), msg.sender, nftIdOnSale, "");
		}
	}

	function listForSale(uint256 nftId) external {
		require(
			ownerOf(nftId) == msg.sender,
			"You are not the owner of this ticket"
		);
		onSale.push(nftId);
	}

	function updateOnSale() private {
		for (uint i = 0; i < onSale.length - 1; i++) {
			onSale[i] = onSale[i + 1];
		}
		onSale.pop();
	}

	function royaltyCalculation() private view returns (uint256) {
		return (ticketPrice * royalty) / 100;
	}

	// The following function is an override required by Solidity.
	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
}

// https://sepolia.etherscan.io/address/0xbd6ca0417759027f1e412bd088c8b5eec94b68df

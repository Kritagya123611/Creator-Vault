// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract MultiEdition is ERC1155, Ownable {
    uint256 public tokenID = 0;

    constructor() ERC1155("https://api.example.com/metadata/{id}.json") {}

    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(tokenID < 10000, "Max token limit reached");

        _mint(to, tokenID, amount, "");
        tokenID++;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}

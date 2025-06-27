// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenMarket is ERC20, Ownable {
    uint256 public tokenPrice = 0.01 ether;
    mapping(address => uint256) public tokenPurchased;

    constructor() ERC20("TokenMarket", "TMKT")  Ownable(msg.sender) {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function buyToken() public payable {
        require(msg.value >= tokenPrice, "Insufficient ETH sent");
        uint256 tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy > 0, "You must buy at least one token");
        require(balanceOf(owner()) >= tokensToBuy, "Not enough tokens in reserve");

        tokenPurchased[msg.sender] += tokensToBuy;
        _transfer(owner(), msg.sender, tokensToBuy);
        payable(owner()).transfer(msg.value);
    }
}

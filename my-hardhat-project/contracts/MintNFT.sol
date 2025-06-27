// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lock is ERC721URIStorage, Ownable {
    uint256 public tokenID;
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
    tokenID = 1;
}
    function mint(address to, string memory tokenURI) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(bytes(tokenURI).length > 0, "Invalid token URI");
        require(tokenID < 10000, "Max token limit reached");
        _mint(to, tokenID);
        _setTokenURI(tokenID, tokenURI);
        tokenID++;
    }
}

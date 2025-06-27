// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyalityShare {
    address public creator;
    address public platform;
    uint256 public creatorShare;

    constructor(address _creator, address _platform, uint256 _creatorShare) {
        require(_creatorShare <= 100, "Creator share must be between 0 and 100");
        creator = _creator;
        platform = _platform;
        creatorShare = _creatorShare;
    }
    receive() external payable {
        uint256 creatorAmount = (msg.value * creatorShare) / 100;
        uint256 platformAmount = msg.value - creatorAmount;
        payable(creator).transfer(creatorAmount);
        payable(platform).transfer(platformAmount);
    }
}
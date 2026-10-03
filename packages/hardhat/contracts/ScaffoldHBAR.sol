// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScaffoldHBAR {
    string public greeting = "Hello from Hedera!";

    function setGreeting(string calldata _greeting) external {
        greeting = _greeting;
    }
}

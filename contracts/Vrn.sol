//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract VRN is IERC20 {
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  uint256 private _totalSupply;
  string private _name = "Vrungel Token";
  string private _symbol = "VRN";

  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view override returns (uint256) {
    return _balances[account];
  }

  function allowance(address owner, address spender)
    public
    view
    override
    returns (uint256)
  {
    return _allowances[owner][spender];
  }

  function transfer(address recipient, uint256 amount)
    public
    override
    returns (bool)
  {
    require(msg.sender != address(0), "Transfer from the zero address");
    require(recipient != address(0), "Transfer to the zero address");

    uint256 senderBalance = _balances[msg.sender];
    require(senderBalance >= amount, "Transfer amount exceeds balance");
    _balances[msg.sender] = senderBalance - amount;
    _balances[recipient] += amount;

    emit Transfer(msg.sender, recipient, amount);
    return true;
  }

  function approve(address spender, uint256 amount)
    public
    override
    returns (bool)
  {
    require(msg.sender != address(0), "Approve from the zero address");
    require(msg.sender != address(0), "Approve to the zero address");

    _allowances[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract VRN is IERC20 {
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  address private _owner;
  uint256 private _totalSupply;
  uint8 private _decimals;
  string private _name;
  string private _symbol;

  constructor() {
    _name = "Vrungel Token";
    _symbol = "VRN";
    _decimals = 18;
    _owner = _msgSender();
  }

  modifier requireOwner() {
    require(_owner == _msgSender(), "You aren't owner");
    _;
  }

  //view methods

  function name() public view override returns (string memory) {
    return _name;
  }

  function symbol() public view override returns (string memory) {
    return _symbol;
  }

  function decimals() public view override returns (uint8) {
    return _decimals;
  }

  function balanceOf(address account) public view override returns (uint256) {
    return _balances[account];
  }

  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }

  function allowance(address owner, address spender)
    public
    view
    override
    returns (uint256)
  {
    return _allowances[owner][spender];
  }

  function mint(address to, uint256 amount) external requireOwner {
    require(to != address(0), "Transfer to the zero address");
    _balances[to] = amount;
    _totalSupply += amount;
    emit Transfer(_owner, to, amount);
  }

  function burn(address from, uint256 amount) external requireOwner {
    require(from != address(0), "Transfer to the zero address");
    uint256 currentAccBallance = _balances[from];
    require(currentAccBallance >= amount, "Burn amount exceeds balance");
    _balances[from] = currentAccBallance - amount;
    _totalSupply -= amount;

    emit Transfer(from, address(0), amount);
  }

  //functions

  function transfer(address to, uint256 value) public override returns (bool) {
    _transfer(_msgSender(), to, value);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 value
  ) public override returns (bool) {
    _transfer(from, to, value);

    uint256 currentAllowance = _allowances[from][_msgSender()];

    require(currentAllowance >= value, "Amount exceeds allowance");
    _approve(from, _msgSender(), currentAllowance - value);
    return true;
  }

  function approve(address spender, uint256 value)
    external
    override
    returns (bool)
  {
    _approve(_msgSender(), spender, value);
    return true;
  }

  function increaseAllowance(address spender, uint256 addedValue)
    external
    override
    returns (bool)
  {
    _approve(
      _msgSender(),
      spender,
      _allowances[_msgSender()][spender] + addedValue
    );
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue)
    external
    override
    returns (bool)
  {
    uint256 currentAllowance = _allowances[_msgSender()][spender];
    require(
      currentAllowance >= subtractedValue,
      "Decreased allowance below zero"
    );
    _approve(_msgSender(), spender, currentAllowance - subtractedValue);
    return true;
  }

  //special function

  function _msgSender() internal view returns (address) {
    return msg.sender;
  }

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal {
    require(sender != address(0), "Transfer from the zero address");
    require(recipient != address(0), "Transfer to the zero address");

    uint256 senderBalance = _balances[sender];
    require(senderBalance >= amount, "Transfer amount exceeds balance");
    _balances[sender] = senderBalance - amount;
    _balances[recipient] += amount;

    emit Transfer(sender, recipient, amount);
  }

  function _approve(
    address owner,
    address spender,
    uint256 amount
  ) internal {
    require(owner != address(0), "Approve from the zero address");
    require(spender != address(0), "Approve to the zero address");

    _allowances[owner][spender] = amount;
    emit Approval(owner, spender, amount);
  }
}

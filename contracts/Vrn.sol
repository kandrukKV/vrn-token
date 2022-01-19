//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract VRN is IERC20 {
  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  address public _owner;
  uint256 public _totalSupply;
  uint256 public _decimals;
  string public _name;
  string public _symbol;

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  constructor() {
    _name = "Vrungel Token";
    _symbol = "VRN";
    _decimals = 18;
    _owner = msg.sender;
  }

  modifier requireOwner() {
    require(_owner == msg.sender, "You aren't owner");
    _;
  }

  //view methods

  function name() public view override returns (string memory) {
    return _name;
  }

  function symbol() public view override returns (string memory) {
    return _symbol;
  }

  function decimals() public view override returns (uint256) {
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
    require(_balances[from] >= amount, "Burn amount exceeds balance");
    _balances[from] -= amount;
    _totalSupply -= amount;

    emit Transfer(from, address(0), amount);
  }

  //functions

  function transfer(address to, uint256 value) public override returns (bool) {
    _transfer(msg.sender, to, value);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 value
  ) public override returns (bool) {
    _transfer(from, to, value);
    require(_allowances[from][msg.sender] >= value, "Amount exceeds allowance");
    _approve(from, msg.sender, _allowances[from][msg.sender] - value);
    return true;
  }

  function approve(address spender, uint256 value)
    external
    override
    returns (bool)
  {
    _approve(msg.sender, spender, value);
    return true;
  }

  function increaseAllowance(address spender, uint256 addedValue)
    external
    override
    returns (bool)
  {
    _approve(
      msg.sender,
      spender,
      _allowances[msg.sender][spender] + addedValue
    );
    return true;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue)
    external
    override
    returns (bool)
  {
    require(
      _allowances[msg.sender][spender] >= subtractedValue,
      "Decreased allowance below zero"
    );
    _approve(
      msg.sender,
      spender,
      _allowances[msg.sender][spender] - subtractedValue
    );
    return true;
  }

  //special function

  function _transfer(
    address sender,
    address recipient,
    uint256 amount
  ) internal {
    require(sender != address(0), "Transfer from the zero address");
    require(recipient != address(0), "Transfer to the zero address");

    require(_balances[sender] >= amount, "Transfer amount exceeds balance");
    _balances[sender] -= amount;
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

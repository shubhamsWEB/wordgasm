// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract WordCoin {
    string public name = "Wordgasm Coin";
    string public symbol = "WGC";
    uint256 public totalSupply = 1000000000000000000000000000;
    uint256 public decimals = 18;
    address me;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Rewarded(address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    event FreeTokens(address indexed _to, uint256 _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
        me = msg.sender;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function rewardTokens(address _to,uint256 _value) public returns (bool success) {
         balanceOf[me] -= _value;
        balanceOf[_to] += _value;
        emit Rewarded(_to, _value);
        return true;
    }

    // function issueFreeTokens() public returns (bool success) {
    //     balanceOf[msg.sender] += 100000000000000000000;
    //     emit FreeTokens(msg.sender, 100000000000000000000);
    //     return true;
    // }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}

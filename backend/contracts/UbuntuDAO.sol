// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract UbuntuDAO {
    IERC20 UbuntuDaoTokens;
    uint amountToVerify = 0.0001 ether;
    using SafeMath for uint;
    address owner;
    bytes32 public normalMember = keccak256("newMember");
    bytes32 public verified = keccak256("verified");
    enum Status {
        Approved,
        Decline
    }

    uint informationIndex;

    struct Information {
        address owner;
        string message;
        string imageurl;
        Status _status;
        uint Approvecount;
        uint declineCount;
        bool trending;
    }

    mapping(uint => Information) public allInformation;
    mapping(address => uint) public usermessageIndex;
    mapping(address => uint) public checkIfMember;
    mapping(address => bool) public ubuntuMember;
    mapping(address => bytes32) public verifyUsers;
    mapping(address => mapping(uint => bool)) public voted;

    //constructor
    constructor() {
        owner = msg.sender;
    }

    //activate the tokens
    function activateTokens(address ubuntuaddresstokens) public onlyTheOwner {
        UbuntuDaoTokens = IERC20(ubuntuaddresstokens);
    }

    //function join ubuntu dao
    function joinUbuntuDao() public {
        require(ubuntuMember[msg.sender] == false, "already a member");
        ubuntuMember[msg.sender] = true;
        UbuntuDaoTokens.transfer(msg.sender, 10);
    }

    //modifier
    modifier onlyTheOwner() {
        require(msg.sender == owner, "only the owner can mint");
        _;
    }
    //modifier
    modifier isMember() {
        require(ubuntuMember[msg.sender] == true, "please join the community");
        _;
    }

    //function to get details
    function getInformation(
        string calldata _message,
        string calldata _imageurl
    ) public isMember {
        require(bytes(_message).length > 0, "please provide the message");
        require(bytes(_imageurl).length > 0, "please provide the image");
        uint index = informationIndex;
        allInformation[index] = Information(
            msg.sender,
            _message,
            _imageurl,
            Status.Decline,
            0,
            0,
            false
        );

        informationIndex = informationIndex.add(1);
    }

    //function readInformation
    function readInformation() public view returns (Information[] memory info) {
        info = new Information[](informationIndex);
        for (uint i = 0; i < informationIndex; i++) {
            info[i] = allInformation[i];
        }
    }

    //function read for a specific user
    function readUserInfomation()
        public
        view
        returns (Information[] memory info)
    {
        uint usermessages = 0;

        for (uint i; i < informationIndex; i++) {
            if (allInformation[i].owner == msg.sender) {
                usermessages = usermessages.add(1);
            }
        }
        info = new Information[](usermessages);
        for (uint i = 0; i < usermessages; i++) {
            if (allInformation[i].owner == msg.sender) {
                info[i] = allInformation[i];
            }
        }
    }

    //upvote or downvote
    function upvoteOrdownVote(bool choice, uint _index) public isMember {
        require(voted[msg.sender][_index] == false, "user Already Voted");

        if (choice == true) {
            upVote(_index);
        } else {
            downVote(_index);
        }
    }

    //upvote function
    function upVote(uint _index) private {
        allInformation[_index].Approvecount = allInformation[_index]
            .Approvecount
            .add(1);
        addVerification();
        voted[msg.sender][_index] = true;
    }

    //downVote
    //upvote function
    function downVote(uint _index) private {
        allInformation[_index].declineCount = allInformation[_index]
            .declineCount
            .add(1);
        addVerification();
        voted[msg.sender][_index] = true;
    }

    //add verification
    function addVerification() private {
        uint verifyCount = checkVerification();
        if (verifyCount > 10) {
            verifyUsers[msg.sender] = verified;
        }
    }

    //check user verification
    function checkVerification() private returns (uint) {
        uint verificationcount = checkIfMember[msg.sender] += 1;
        return verificationcount;
    }

    //get all trending information
    function getTrending()
        public
        view
        isMember
        returns (Information[] memory trending)
    {
        uint trendingIfnformation = 0;

        for (uint i; i < informationIndex; i++) {
            if (
                allInformation[i].Approvecount > 2 ||
                allInformation[i].declineCount > 2
            ) {
                trendingIfnformation = trendingIfnformation.add(1);
            }
        }
        trending = new Information[](trendingIfnformation);
        for (uint i = 0; i < trendingIfnformation; i++) {
            if (
                allInformation[i].Approvecount > 2 ||
                allInformation[i].declineCount > 2
            ) {
                trending[i] = allInformation[i];
            }
        }
    }

    //function get Verified
    function verifiedUser() public payable {
        UbuntuDaoTokens.transfer(msg.sender, 10);
        require(msg.value == amountToVerify, "less amount");
        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "unable to transfer");
    }

    //check userBalance for Ubuntu Tokens
    function checkUserBalance() public view returns (uint) {
        return UbuntuDaoTokens.balanceOf(msg.sender);
    }

    //delete information

    function deleteInfor(uint _index) public isMember {
        require(
            verifyUsers[msg.sender] == verified,
            "only verified user can delete"
        );
        require(
            allInformation[_index].owner == msg.sender,
            "only the owner can delete the information"
        );
        delete allInformation[_index];
    }

    //function award token
    function reward(uint _index) public payable {
        require(msg.value > 0, "less amount please top up");

        (bool success, ) = payable(allInformation[_index].owner).call{
            value: msg.value
        }("");
        require(success, "failed");
    }

    //get amount for verification
    function amountForVerification() public view returns (uint) {
        return amountToVerify;
    }

    modifier onlyOwners() {
        require(msg.sender == owner, "only owner can withdraw");
        _;
    }

    //withdraw funds

    function withdraw() external payable onlyOwners {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    //function show available balance
    function showAvailableBalance() public view returns (uint) {
        return address(this).balance;
    }

    receive() external payable {}

    fallback() external payable {}
}

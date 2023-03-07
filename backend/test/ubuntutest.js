
const {expect} = require("chai")
describe("deploy Contracts", function(){
    let ubuntuTokenContract;
    let ubuntuDaoContract;
    let owner;
    let otherAccount;
    let anotheraccount;
    before(async function(){
        
        //deploy ubuntu token
        const ubuntuToken = await ethers.getContractFactory("UbuntuTokens");
      ubuntuTokenContract = await ubuntuToken.deploy();
    await ubuntuTokenContract.deployed();
    //deploy ubuntu dao
    const ubuntudao = await ethers.getContractFactory("UbuntuDAO")
     ubuntuDaoContract = await ubuntudao.deploy();
    await ubuntuDaoContract.deployed();
    //get accounts
    [owner, otherAccount] = await ethers.getSigners();
    anotheraccount = await ethers.getSigners(0);

///test it
    })
it("should deploy and return total supply to 0", async function(){
   const result = await ubuntuTokenContract.totalSupply();
   
    expect(result).to.equal(0);
});
it("should mint tokens to address", async function(){
    const value = BigInt(1000);
    await ubuntuTokenContract.connect(owner).mintTokens(ubuntuDaoContract.address, value);

    // Check that the total supply has increased
    const result = await ubuntuTokenContract.totalSupply();
    expect(await result).to.equal(BigInt(1000*10**18) );
})
it("should check only the owner can mint tokens to address", async function(){
    const value = BigInt(1000);
    await expect(ubuntuTokenContract.connect(otherAccount).mintTokens(ubuntuDaoContract.address, value))
        .to.be.revertedWith("only the owner can mint");
})

it("should activate the tokens by only the owner", async function(){
    await expect(ubuntuDaoContract.connect(otherAccount).activateTokens(ubuntuTokenContract.address)).to.be.revertedWith("only the owner can mint")
})
it("should check if user already join community", async function(){
     // Add the user to the mapping
     const value = BigInt(1000);
//      await ubuntuTokenContract.connect(owner).mintTokens(ubuntuDaoContract.address, value)
 
  await ubuntuDaoContract.connect(owner).activateTokens(ubuntuTokenContract.address)
  await ubuntuDaoContract.connect(otherAccount).joinUbuntuDao();
  

  
 expect( await ubuntuDaoContract.ubuntuMember(otherAccount.address)).to.equal(true);
})
it("should be able to write data", async function(){

    const data =
        {name:"ronex",
    imageurl:"htpps://ronex"}
    
    await ubuntuDaoContract.connect(otherAccount).getInformation(data.name,data.imageurl);
    const results = await ubuntuDaoContract.connect(otherAccount).readInformation();
   
    expect(results[0].message).to.equal(data.name);
})
it("should be able to readOnly User Information", async function(){
    const data =
    {name:"ronex",
imageurl:"htpps://ronex"}
    const results = await ubuntuDaoContract.connect(otherAccount).readUserInfomation();
    expect(results[0].imageurl).to.equal(data.imageurl)
})
it("should be able to vote for information ", async function(){
    await  ubuntuDaoContract.connect(otherAccount).upvoteOrdownVote(true,0);
    const results = await ubuntuDaoContract.voted(otherAccount.address)
    expect(results).to.equal(true);
})
// it("should check if user already join community", async function(){
//     await expect(ubuntuDaoContract.joinUbuntuDao()).to.be.revertedWith("already a member")
// })
})
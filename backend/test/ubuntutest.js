
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
// it("should check if user already join community", async function(){
//      // Add the user to the mapping
//   await ubuntuDaoContract.joinUbuntuDao({ from: anotheraccount.address });

//   // Check that the user exists in the mapping
//   const userExists = await ubuntuDaoContract.ubuntuMember(anotheraccount.address);
//   console.log("user",userExists);
//   expect(userExists).to.equal(true);
// })
// it("should check if user already join community", async function(){
//     await expect(ubuntuDaoContract.joinUbuntuDao()).to.be.revertedWith("already a member")
// })
})
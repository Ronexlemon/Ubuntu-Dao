
const {expect} = require("chai")
describe("deploy Contracts", function(){
    let ubuntuTokenContract;
    let ubuntuDaoContract;
    before(async function(){
        //deploy ubuntu token
        const ubuntuToken = await ethers.getContractFactory("UbuntuTokens");
      ubuntuTokenContract = await ubuntuToken.deploy();
    await ubuntuTokenContract.deployed();
    //deploy ubuntu dao
    const ubuntudao = await ethers.getContractFactory("UbuntuDAO")
     ubuntuDaoContract = await ubuntudao.deploy();
    await ubuntuDaoContract.deployed();


    })
it("should deploy and return total supply to 0", async function(){
   const result = await ubuntuTokenContract.totalSupply();
    
    expect(result).to.equal(0);
})

})
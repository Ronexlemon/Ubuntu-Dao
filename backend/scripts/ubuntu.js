const {ethers} = require("hardhat")

async function main(){
    //get the contract for tokens
    const UbuntuTokenContract = await ethers.getContractFactory("UbuntuTokens");
    //deploy contract
    const UbuntuTokenContractDeploy = await UbuntuTokenContract.deploy();
    //await deployment
     await UbuntuTokenContractDeploy.deployed();
    //console.address
    console.log("UbuntuTokenContractAddress:", UbuntuTokenContractDeploy.address);
    /**
     * deploy for the UBUNTU Contract DAO
     */
    //get the contract for UBUNTUDAO
    const UbuntuDAOContract = await ethers.getContractFactory("UbuntuDAO");
    //deploy contract
    const UbuntuDAOContractDeploy = await UbuntuDAOContract.deploy();
    //await deployment
     await UbuntuDAOContractDeploy.deployed();
    //console.address
    console.log("UbuntuDAOContractAddress:", UbuntuDAOContractDeploy.address);
}
//call main
main().then(()=>
process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
    
})
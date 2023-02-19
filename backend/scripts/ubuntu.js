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
}
//call main
main().then(()=>
process.exit(0))
.catch((error)=>{
    process.exit(1);
    console.log(error);
})
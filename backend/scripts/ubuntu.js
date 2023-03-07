const {ethers} = require("hardhat")
// UbuntuTokenContractAddress: 0x05198c2783d3497361ca936a70E5643287dfD0B8
// UbuntuDAOContractAddress: 0xE50A2E68f31e899D6e794314823cD2ac126BD764
//2
//UbuntuTokenContractAddress: 0x1E4D739690aBa61e9FC02fA638b1747855c1e144
//UbuntuDAOContractAddress: 0xE26bd402D637Dd6530c0111c3066Ee98e14E3de8
//3
//UbuntuTokenContractAddress: 0x07DCD270159185725346361CB8462d36b3dAb90F
//UbuntuDAOContractAddress: 0xF75D4Bb568c93C1e88690B98B54814ACFE349ED5
//4
//UbuntuTokenContractAddress: 0x1a47bfF92Ae4a6d399Fc72294cFC67D3C270EbCf
//UbuntuDAOContractAddress: 0xB9a0B477C463B0895EBF72F411c6049B63f38b49
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
import React, { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao} from "../abi/ubuntuDao";
import {UbuntuToken} from "../abi/ubuntuToken";


const Account = ()=>{
    const UbuntuTokenContractAddress = "0x82b09B6Bb7589452eaea691C8CDA0f419f6802fE"
const UbuntuDAOContractAddress = "0x10F2DA7A73Efa54f97Cea89eC4C59c25855Bd95d"
const [userAccount, setUserAccount] = useState();
  const [isConnected, setConnected] = useState(false);
  const [ubuntuTokenAmount, setUbuntuToken] = useState();
  const [ubuntuTokentotal, setUbuntuTokenTotal] = useState();
  const [fantomamount, setFantomAmount] = useState();
  const  [amountTopurchase,setAmount] = useState();

const Web3ModalRef = useRef();
  //provide sgner or provider
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // check if network is fantomTestnet
    const { chainId } = await web3Provider.getNetwork();
    const signer = web3Provider.getSigner();
    const accounts = await signer.getAddress();
    const bal = await web3Provider.getBalance(accounts);
    setFantomAmount(bal)
    setUserAccount(accounts);
    if (chainId !== 4002) {
      window.alert("Change network to FantomTestnet");
      throw new Error("Change network to FantomTestnet ");
    }
    setConnected(true);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  const getUserUbuntuBalance = async ()=>{
    try{
        const provider = await getProviderOrSigner();
        const contract = new Contract(UbuntuDAOContractAddress ,ubuntuDao,provider)
        const balances = await  contract.checkUserBalance();
        setUbuntuToken(balances);

    }catch(error){
        console.log(error)
    }
  }
  const getUbuntuTokenTotal = async ()=>{
    try{
        const provider = await getProviderOrSigner();
        const contract = new Contract(UbuntuTokenContractAddress,UbuntuToken,provider)
        const totall = await  contract.totalSupply();
       
        setUbuntuTokenTotal(totall);

    }catch(error){
        console.log(error)
    }
  }
  const getAmountToVerify = async ()=>{
    try{
        const provider = await getProviderOrSigner();
        const contract = new Contract(UbuntuDAOContractAddress,ubuntuDao,provider);
        const amount = await contract.amountForVerification();
setAmount(amount)
        
    }catch(error){
        console.log("purchase error", error);
    }
  }
  const purchase = async ()=>{
    try{
       
        const signer = await getProviderOrSigner(true);

        const contract = new Contract(UbuntuDAOContractAddress,ubuntuDao,signer)
        await contract.verifiedUser({value:amountTopurchase });
    }catch(error){
        console.log("purchase error", error);
    }
  }
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "fantomTestnet",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    getProviderOrSigner();
    getUserUbuntuBalance();
    getUbuntuTokenTotal();
    getAmountToVerify();
  }, []);
    return(
        <div className="w-full  h-screen bg-orange-200">
            <div className="grid grid-cols-2 gap-4 h-full w-full">
                <div className="bg-green-200">
<h1>Ubuntu Token TotalSupply</h1>
<div className="flex justify-center items-center ">
<h2>{Number(ubuntuTokentotal/10 **18)}</h2>
                </div>

                </div>
                <div className="bg-green-300">
                    <h1>Ubuntu tokens My Balance</h1>
                    <div className="flex justify-center items-center ">
                    <h2>{Number(ubuntuTokenAmount)}</h2>

                </div>
                    
                </div>
                <div className="bg-green-400">
                <h1>Fantom  Balance</h1>
                <div className="flex justify-center items-center ">
                <h2>{Number(fantomamount/10**18)}</h2>
                </div>
                

                </div>
                <div className="bg-green-400">
                <h1>Acquire Ubuntu Token</h1>
                <div className="flex justify-center items-center ">
                <button onClick={()=>{purchase()}} className="border-2 rounded-2xl bg-black text-white">Purchase</button>
                </div>
                

                </div>

            </div>

        </div>
    )


}

export default Account;
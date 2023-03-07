import React, { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao} from "../abi/ubuntuDao";
import {UbuntuToken} from "../abi/ubuntuToken";

const Account = ()=>{
    const UbuntuTokenContractAddress = "0x1a47bfF92Ae4a6d399Fc72294cFC67D3C270EbCf"
const UbuntuDAOContractAddress = "0xB9a0B477C463B0895EBF72F411c6049B63f38b49"
const [userAccount, setUserAccount] = useState();
  const [isConnected, setConnected] = useState(false);
  const [ubuntuTokenAmount, setUbuntuToken] = useState();
  const [ubuntuTokentotal, setUbuntuTokenTotal] = useState();
  const [fantomamount, setFantomAmount] = useState();

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
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "fantomTestnet",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    getProviderOrSigner();
    getUserUbuntuBalance()
    getUbuntuTokenTotal()
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
                <button className="border-2 rounded-2xl bg-black text-white">Purchase</button>
                </div>
                

                </div>

            </div>

        </div>
    )


}

export default Account;
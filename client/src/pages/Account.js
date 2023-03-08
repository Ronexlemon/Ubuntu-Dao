import React, { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao } from "../abi/ubuntuDao";
import { UbuntuToken } from "../abi/ubuntuToken";
import Sidebar from "../components/Sidebar";

const Account = () => {
  const UbuntuTokenContractAddress =
    "0x82b09B6Bb7589452eaea691C8CDA0f419f6802fE";
  const UbuntuDAOContractAddress = "0x10F2DA7A73Efa54f97Cea89eC4C59c25855Bd95d";
  const [userAccount, setUserAccount] = useState();
  const [isConnected, setConnected] = useState(false);
  const [ubuntuTokenAmount, setUbuntuToken] = useState();
  const [ubuntuTokentotal, setUbuntuTokenTotal] = useState();
  const [fantomamount, setFantomAmount] = useState();
  const [amountTopurchase, setAmount] = useState();

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
    setFantomAmount(bal);
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
  const getUserUbuntuBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        provider
      );
      const balances = await contract.checkUserBalance();
      setUbuntuToken(balances);
    } catch (error) {
      console.log(error);
    }
  };
  const getUbuntuTokenTotal = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        UbuntuTokenContractAddress,
        UbuntuToken,
        provider
      );
      const totall = await contract.totalSupply();

      setUbuntuTokenTotal(totall);
    } catch (error) {
      console.log(error);
    }
  };
  const getAmountToVerify = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        provider
      );
      const amount = await contract.amountForVerification();
      setAmount(amount);
    } catch (error) {
      console.log("purchase error", error);
    }
  };
  const purchase = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        signer
      );
      await contract.verifiedUser({ value: amountTopurchase });
    } catch (error) {
      console.log("purchase error", error);
    }
  };
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
  return (
    <main className="flex">
      <Sidebar />
      <section className="p-6 bg-[#EEEFF0] bg-cover w-full text-gray-100">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-2">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-lg text-black">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sidebg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-9 w-9 text-gray-800"
              >
                <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                Ubuntu Token Total Supply
              </p>
              <p className="capitalize">
                {Number(ubuntuTokentotal / 10 ** 18)}
              </p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-lg text-black">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sidebg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-9 w-9 text-gray-800"
              >
                <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                Ubuntu tokens My Balance
              </p>
              <p className="capitalize">{Number(ubuntuTokenAmount)}</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-lg text-black">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sidebg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-9 w-9 text-gray-800"
              >
                <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                <rect width="32" height="32" x="80" y="264"></rect>
                <rect width="32" height="32" x="240" y="128"></rect>
                <rect width="32" height="32" x="136" y="168"></rect>
                <rect width="32" height="32" x="400" y="264"></rect>
                <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                Fantom Balance
              </p>
              <p className="capitalize">{Number(fantomamount / 10 ** 18)}</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-white shadow-lg text-black">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sidebg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-9 w-9 text-gray-800"
              >
                <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                Acquire Ubuntu Token
              </p>
            </div>
            <button
              onClick={() => {
                purchase();
              }}
              className="border-2 rounded-md font-bold bg-sidebg text-black w-[200px] h-[50px]"
            >
              Purchase
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;

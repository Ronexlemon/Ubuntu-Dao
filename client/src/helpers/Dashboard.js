import React,{useState,useRef,useEffect} from "react";
import { MdOutlineSearch } from "react-icons/md";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router-dom";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

const Dashboard = () => {
  const [userAccount,setUserAccount] = useState();
  const [isConnected,setConnected] = useState(false)
  
  const Web3ModalRef = useRef();
   //provide sgner or provider
   const getProviderOrSigner = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // check if network is fantomTestnet
    const { chainId } = await web3Provider.getNetwork();
    const signer = web3Provider.getSigner();
    const accounts = await signer.getAddress();
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
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "fantomTestnet",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false,
    });
    getProviderOrSigner();
  }, []);
  return (
    <main>
      <section className="flex">
        <Sidebar />
        <section className="lg:w-10/12 bg-section">
          <section>
            <article className="flex justify-between items-center p-5 bg-white">
              <form className="flex py-0.5 px-2 items-center border border-gray-300 overflow-hidden rounded-xl justify-between ">
                <MdOutlineSearch fontSize={26} className="text-gray-500" />
                <input
                  type="text"
                  className="py-1.5  px-2 w-full outline-none bg-transparent  text-sm  placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="Search for posts"
                  name="search"
                />
              </form>
              {isConnected?<button className="px-3 py-1 w-fit cursor-pointer rounded-full hover:rounded-none bg-green-400 text-white">
                Connected
              </button>:<button onClick={()=>{getProviderOrSigner()}} className="px-3 py-1 w-fit cursor-pointer rounded-full hover:rounded-none bg-button text-white">
                Connect Wallet
              </button>}
              
            </article>
          </section>
          <section className="w-[90%] mx-auto bg-dashHeading rounded-md text-dashHeading m-5 p-5">
            <article className="flex flex-col gap-3">
              <h1 className="font-bold text-xl">
                Verify Real-World Scenarios through our platform{" "}
              </h1>
              <p className="w-[80%]">
                A Decentralized verification system using DAO and blockchain
                technology to enable transparent and secure consensus, allowing
                users to easily verify real-world scenarios online and start
                community initiatives
              </p>
              <button className="px-3 py-1 bg-white font-medium w-fit cursor-pointer rounded-lg">
                Find Out now
              </button>
            </article>
          </section>
          <section>
            <Posts />
          </section>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;

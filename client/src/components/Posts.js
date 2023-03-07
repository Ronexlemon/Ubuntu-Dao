import React, {useEffect,useState,useRef} from "react";
import Post from "./Post";
// import { data } from "../helpers/postSource";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao} from "../abi/ubuntuDao";


const Posts = () => {
  const UbuntuDAOContractAddress = "0xF75D4Bb568c93C1e88690B98B54814ACFE349ED5"
  const [userAccount, setUserAccount] = useState();
  const [isConnected, setConnected] = useState(false);
  const [data,setData] = useState([]);

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
  const getAllInformation = async()=>{
    try{
      let _data = [];
      const provider = await getProviderOrSigner();
      const contract = new Contract(UbuntuDAOContractAddress,ubuntuDao,provider);
      const results = await  contract.readInformation();
      
      results?.forEach((element)=>{
        _data.push(element);
      });
      setData(_data);

    }catch(error){
      console.log("all info ",error);
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
    getAllInformation();
  }, []);
  return (
    <main className="flex flex-col gap-5">
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Posts;

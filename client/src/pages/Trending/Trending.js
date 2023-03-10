import React, { useEffect, useState, useRef } from "react";
import DisplayTrending from "./DisplayTrending";
// import { data } from "../helpers/postSource";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao } from "../../abi/ubuntuDao";
import Sidebar from "../../components/Sidebar";

const Trending = () => {
  const UbuntuDAOContractAddress = "0x10F2DA7A73Efa54f97Cea89eC4C59c25855Bd95d";
  const [userAccount, setUserAccount] = useState();
  const [isConnected, setConnected] = useState(false);
  const [data, setData] = useState([]);

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
  //upvoting
  const upvote = async (choice, _index) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        provider
      );
      await contract.upvoteOrdownVote(choice, _index);
    } catch (error) {
      console.log("apvote error", error);
    }
  };
  const getAllInformation = async () => {
    try {
      let _data = [];
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        signer
      );
      const results = await contract.getTrending();

      results?.forEach((element) => {
        _data.push(element);
      });
      setData(_data);
    } catch (error) {
      console.log("all info ", error);
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
    getAllInformation();
  }, []);
  return (
    <section className="flex bg-[#EEEFF0]">
      <Sidebar />
      <main className="flex flex-col gap-5">
        {data.map((post, index) => (
          <DisplayTrending index={index} post={post} upvote={upvote} />
        ))}
      </main>
    </section>
  );
};

export default Trending;

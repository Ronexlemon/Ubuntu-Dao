import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import { datas } from "../helpers/postSource";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { ubuntuDao } from "../abi/ubuntuDao";
import { ethers } from "ethers";

const Posts = () => {
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
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        signer
      );
      await contract.upvoteOrdownVote(choice, _index);
    } catch (error) {
      console.log("apvote error", error);
    }
  };
  const getAllInformation = async () => {
    try {
      let _data = [];
      const provider = await getProviderOrSigner();
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        provider
      );
      const results = await contract.readInformation();

      results?.forEach((element) => {
        _data.push(element);
      });
      setData(_data);
    } catch (error) {
      console.log("all info ", error);
    }
  };
  //reward
  const Reward = async (_index) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        signer
      );
      await contract.reward(_index, { value: ethers.utils.parseEther("0.1") });
    } catch (error) {
      console.log("error reward", error);
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
    <main className="container mx-auto m-5 p-5 flex  flex-col gap-5">
      {datas.map((post, index) => (
        <Post index={index} post={post} upvote={upvote} Reward={Reward} />
      ))}
    </main>
  );
};

export default Posts;

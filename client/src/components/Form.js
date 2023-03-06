import React from "react";

import Web3Modal from "web3modal";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SiBitcoincash } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Web3Storage, getFilesFromPath } from "web3.storage";

import { providers, Contract } from "ethers";
import { ubuntuDao} from "../abi/ubuntuDao";

const Form = () => {
    const UbuntuDAOContractAddress = "0xE26bd402D637Dd6530c0111c3066Ee98e14E3de8"
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJFRjRiMTdhYzY1MjgzNEYxQTBkMTQxNTUwOTRlYTdiYTMzRWEyOWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzcyMzA1NTE0NTMsIm5hbWUiOiJ0ZW5kZXJzcGFjZSJ9.CwbHkp79KAwCjQTpRmlRJWSWKa10VBSJLLv4eMrmVJs";
  

  
  
  
  const [messageinfo, setmessageinfo] = useState("");
  const [biderCompanyRegistrationNumber, setBiderCompanyRegistrationNumber] =
    useState("");
  const [biderContact, setBiderContact] = useState("");
  const [_tenderIndex, settenderIndex] = useState("");
  const [imagelink, setImageLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("");
  const Web3ModalRef = useRef();
  //provide sgner or provider
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // check if network is fantomTestnet
    const { chainId } = await web3Provider.getNetwork();
    const signer = web3Provider.getSigner();
    const accounts = await signer.getAddress();
    // setUserAccount(accounts);
    if (chainId !== 4002) {
      window.alert("Change network to FantomTestnet");
      throw new Error("Change network to FantomTestnet ");
    }
    //setConnected(true);
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const btnsubmit = async (e) => {
    e.preventDefault();
    const params = [
      
      messageinfo,
      imagelink,
    ];

    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(
        UbuntuDAOContractAddress,
        ubuntuDao,
        signer
      );
       await contract.getInformation(...params);

      alert("post Successful ");
    } catch (error) {
      alert(error);
    }
  };

  
  
  const handleAddTender = async (event) => {
    //prevent page refresh

    event.preventDefault();
    try {
      setIsLoading(true);
      const form = event.target;
      const files = form[0].files;

      if (!files || files.length === 0) {
        return alert("No files selected");
      }

      const file = files[0];
      const storage = new Web3Storage({ token });

      console.log(`Uploading ${files.length} files`);
      const cid = await storage.put(files);
      console.log(
        "Content added with CID:",
        "https://" + cid + ".ipfs.w3s.link/" + `${file.name}`
      );
      const linkurl = "https://" + cid + ".ipfs.w3s.link/" + `${file.name}`;

      setImageLink(linkurl);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }

   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setmessageinfo("");
    //setBiderContact("");
    
    // setTypeOfGoods("");
  }
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
    <div className="flex">
      <div className="mx-auto w-[95%] my-10">
        <div className="">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-jakarta text-3xl font-extrabold">
                Create a Post
              </h1>
              <p className="py-4 pr-4 font-josefin">
                Connect wallet to fill in the form below to make a post
              </p>
            </div>

            {/* <div>
              <button className="px-4 py-2 font-josefin text-white bg-primary-color rounded-full shadow-md hover:shadow-lg">
                Connect Wallet
              </button>
            </div> */}
          </div>

          <div className="bg-white w-1/3 shadow-sm my-4 p-10 rounded-md">
            <div>
              <form onSubmit={handleAddTender}>
                <div className="space-y-5">
                  <label className="font-josefin pb-6">
                    Upload image
                  </label>
                  <br />
                  {isLoading ? (
                    <p className="text-green-500">Uploading...</p>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  name="file"
                  className="border-2 py-3 pl-3 rounded-md"
                />
                <button className="button" type="submit">
                  Upload file
                </button>
              </form>
            </div>
            <div className="my-6 w-full">
              <form
                onSubmit={handleSubmit}
                className="flex justify-between w-11/12 mx-auto"
              >
                <div className="space-y-4">
                  <div className="w-full">
                    <label className="font-josefin">Message to Post</label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="text"
                      id="company"
                      name="biderCompanyName"
                      placeholder="Post something..."
                      required
                      onChange={(e) => setmessageinfo(e.target.value)}
                      value={messageinfo}
                    />
                  </div>

                  <div className="flex justify-between my-4">
                    <button
                      className="px-10 py-2 border-2 border-secondary-color text-gray-300 rounded-md mb-2 font-josefin"
                      onClick={() => navigate("/dashboard")}
                    >
                      Close
                    </button>
                    <button
                      className="px-10 py-2 bg-button-color text-black rounded-md shadow-md mb-2 font-josefin"
                      onClick={btnsubmit}
                      type="submit"
                      value="Submit"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
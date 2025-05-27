import React, { useEffect, useState } from "react";
import { Web3Context } from "./web3Context";
import { getWeb3State } from "../utils/getWeb3State";
import { getWeb3StateSilent } from "../utils/getWeb3StateSilent";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    provider: null,
    signer: null,
    accountAddress: null,
    chainId: null,
    contractInstance: null
  });
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false)

  const connectWallet = async () => {
    try {
      const {
        provider,
        signer,
        chainId,
        accountAddress, 
        contractInstance
      } = await getWeb3State();
      setWeb3State({
        provider,
        signer,
        accountAddress,
        chainId, contractInstance
      });
      localStorage.setItem("isWalletConnected", true);
      setIsWalletConnected(true);
      console.log({
        provider,
        signer,
        chainId,
        accountAddress,
        contractInstance
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {


      const isWalletConnected = localStorage.getItem("isWalletConnected");
      console.log(isWalletConnected);

      if (isWalletConnected === "true") {
        const {
          provider,
          signer,
          chainId,
          accountAddress, contractInstance
        } = await getWeb3StateSilent();
        setWeb3State({
          provider,
          signer,
          accountAddress,
          chainId,
          contractInstance
        });
        setIsWalletConnected(true);

   
      }
    
    };
    setTimeout(() => {
      connectWalletOnPageLoad()
      setIsInitialized(true)
    }, 1000);
  

    const accountChangeHandler = (accounts) => {
      handleAccountChange(
        setIsWalletConnected,
        accounts,
        setWeb3State,
        web3State
      );
    };
    const chainChangeHandler = () => {
      handleChainChange(setWeb3State);
    };

    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on("accountsChanged", accountChangeHandler);
      window.ethereum.on("chainChanged", chainChangeHandler);
    }

    return () => {
      window.ethereum.removeListener("accountsChanged", accountChangeHandler);
      window.ethereum.removeListener("chainChanged", chainChangeHandler);
    };
  }, []);

  
  return (
    <>
      <Web3Context.Provider
        value={{ isWalletConnected, web3State, connectWallet, isInitialized }}
      >
        {children}
      </Web3Context.Provider>
    </>
  );
};

export default Web3Provider;

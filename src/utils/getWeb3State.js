import { ethers } from "ethers";
import contractDetails from "../constants/contracts.json";
import linkedInPostRewardAbi from "../constants/linkedInPostRewardAbi.json";
import { useNavigate } from "react-router-dom";

export const getWeb3State = async () =>  {

    try {

        if(!window.ethereum){
            throw new Error("No wallet installed !!")
        }

        const accounts = await window.ethereum.request({

            method : "eth_requestAccounts"
        })

        const accountAddress = accounts[0]

        const chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })

        const chainId = parseInt(chainIdHex, 16);

        if ( contractDetails.chainId !== chainId){
            throw new Error(`Please switch to network : ${contractDetails.networkName} (Chain ID: ${contractDetails.chainId})`)
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        
        const contractInstance = new ethers.Contract( contractDetails.linkedinpostreward, linkedInPostRewardAbi, signer )
        console.log(contractInstance);
        

        return { chainId, provider, signer, accountAddress, contractInstance }

    } catch (error) {
        console.error(error);
        alert(error.message || "An error occurred while connecting to the wallet.");
        useNavigate("/");
    }
}
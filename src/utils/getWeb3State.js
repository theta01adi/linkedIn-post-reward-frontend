import { ethers } from "ethers";
import contracts from "../constants/contracts.json";
import linkedInPostRewardAbi from "../constants/linkedInPostRewardAbi.json";

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
        
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        
        const contractInstance = new ethers.Contract( contracts.linkedinpostreward, linkedInPostRewardAbi, signer )
        console.log(contractInstance);
        

        return { chainId, provider, signer, accountAddress, contractInstance }

    } catch (error) {
        console.error(error);
        throw new Error
    }
}
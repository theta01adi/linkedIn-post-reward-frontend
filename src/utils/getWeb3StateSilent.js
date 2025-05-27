import { ethers } from "ethers"

export const getWeb3StateSilent = async () => {

    try {
       
        
        if(!window.ethereum){
            throw new Error("No wallet installed!!")
        }

        const accounts = await window.ethereum.request({
            method:"eth_accounts"
        })

        const accountAddress = accounts[0]

        const chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })

        const chainId = parseInt(chainIdHex,16)
        const provider = new ethers.BrowserProvider(window.ethereum)

        const signer = await provider.getSigner()
       
        return { chainId, provider, signer, accountAddress }

        
    } catch (error) {
        console.error(error);
        throw new Error;
    }

}


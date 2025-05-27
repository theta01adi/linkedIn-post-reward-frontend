
export const handleChainChange = async (setWeb3State) => {

    const chainIdHex = await window.ethereum.request({
        method:'eth_chainId'
    })

    
    
    const chainId = parseInt(chainIdHex,16)
    console.log(chainId);
    setWeb3State((prevState) => ({...prevState, chainId}))
}
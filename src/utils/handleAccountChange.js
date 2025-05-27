export const handleAccountChange = async (setIsWalletConnected, accounts, setWeb3State, web3State) => {
    console.log(accounts);
    console.log("Accounts");
    
    if (accounts.length === 0) {
            // No accounts are connected
            
            localStorage.removeItem("isWalletConnected");
            setWeb3State({
              provider: null,
              signer: null,
              accountAddress: null,
              chainId: null,
            });
            setIsWalletConnected(false);
    }else{

        console.log("Account changed");
        
        
        const accountAddress = accounts[0];

        setWeb3State((prevState) => ({ ...prevState, accountAddress }));
    
    }
    
  
  };
  
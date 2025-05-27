import React, { useEffect, useState } from 'react'
import { useWeb3State } from '../../context/useWeb3Context';

const UserRegistration = () => {

    const [username, setUsername] = useState("");
    const { web3State , isWalletConnected } = useWeb3State();
    const { accountAddress, contractInstance } = web3State;

    // useEffect(() => {



    // }, [isWalletConnected, web3State])

    const registerUser = async () => {
        if(!accountAddress && !contractInstance){
            alert(
                "Error : No account address or contract instance found. "
            )
            return;
        }

        if(!username){
            alert(
                "Error : Please enter your username"
            )
            return;
        }

        try{

            console.log("Username:", username);
            console.log("Account Address:", accountAddress);

            const tx = await contractInstance.register_user(username);
            console.log("Transaction:", tx);
            tx.wait();
            
            console.log("User registered successfully:", username);
            alert("You registered successfully!");
            

        }catch (error){
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again.");
        }

    }


    if(!isWalletConnected){
        return (
            <div>
                <h1>Please connect your wallet to register</h1>
            </div>
        )
    }

  return (
    <div>
        <h1>Register here !! for LinkedIn Post Reward</h1>

        <input type="text" onChange={(e)=> setUsername(e.target.value)} value={username} placeholder='Enter your linkedIn username : '/>
        <button onClick={registerUser}>Register</button>
       
    </div>
  )
}

export default UserRegistration
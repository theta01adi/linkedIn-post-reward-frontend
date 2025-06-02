import React, { useEffect, useState } from 'react'
import { useWeb3State } from '../../context/useWeb3Context';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {

    const walletStatus = localStorage.getItem("isWalletConnected")
    const [username, setUsername] = useState("");
    const { web3State , isWalletConnected } = useWeb3State();
    const { accountAddress, contractInstance } = web3State;
    const navigate = useNavigate()

    useEffect(() => {

        if(!walletStatus){
            alert("Connect your wallet first !")
            navigate("/")
        }

    }, [isWalletConnected])

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
            navigate("/home")

        }catch (error){
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again.");
        }

    }


    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              Register for LinkedIn Post Reward
            </h1>
    
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your LinkedIn username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    
            <button
              onClick={() => registerUser(username)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Register
            </button>
          </div>
        </main>
      );
}

export default UserRegistration
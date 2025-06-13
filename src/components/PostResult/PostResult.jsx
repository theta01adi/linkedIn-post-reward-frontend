import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3State } from "../../context/useWeb3Context";
import { ethers } from "ethers";
import axios from "axios";

const PostResult = () => {
  const { web3State } = useWeb3State();
  const { accountAddress, contractInstance } = web3State;
  const [result, setResult] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [announcing, setAnnouncing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOwner = async () => {
      try {
        const owner = await contractInstance.owner();
        console.log("Owner address:", owner);
        if (owner.toLowerCase() === accountAddress.toLowerCase()) {
        setIsOwner(true);
      }
      } catch (error) {
        console.error("Error fetching contract owner:", error);
        alert("Failed to verify contract owner. Please try again.");
        navigate("/home");
      }
    };

    const resultStatus = async () => {
      try {
        // const winnerAddress = await contractInstance.winner();
        const winnerAddress = null;

        if (winnerAddress !== ethers.ZeroAddress) {
          setResult(winnerAddress);
        }
      } catch (error) {
        alert("Error fetching result. Please try again later.");
        console.error("Error fetching result:", error);
      }
    };

    if (contractInstance && accountAddress) {
      getOwner();
      resultStatus();
      setLoading(false);
    }
  }, [contractInstance, accountAddress, navigate]);

  const announceResult = async () => {

    setAnnouncing(true);
    setError(null);

    console.log(import.meta.env.VITE_TEST_BACKEND_URL);
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TEST_BACKEND_URL}/announce-result`
      );
      console.log("Response :", response.data);
      console.log(response);
      
      if (response.status == 200) {
        console.log("Winner selected :", response.data.user_address);
        alert("Winner announced successfully!");
      } else {
        throw new Error(
          response.data.message || "Result announce failed on backend."
        );
      }

      setResult(response.data.user_address);

  
    } catch (err) {
      console.error("Error announcing result:", err);
      setError("Failed to announce result. Please try again later.");
    } finally {
      setAnnouncing(false);
    }
  };

  return (
      
        <div className="w-full max-w-5xl p-8 ">
          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
          )}
    
          {/* Error */}
          {error && (
            <p className="text-center text-red-600 dark:text-red-400">{error}</p>
          )}
    
          {/* Winner Address */}
          {result && (
            <div className="p-5 bg-green-50 dark:bg-green-900 rounded-lg border border-green-300 dark:border-green-600 shadow-sm text-center">
              <p className="text-lg font-mono text-green-800 dark:text-green-200">
                🎉 Winner Address: {result}
              </p>
            </div>
          )}
    
          {/* No Winner + Announce */}
          {!result && !loading && !error && (
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-center space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                🚫 No winner has been declared yet.
              </p>
              {isOwner && (
                <button
                  onClick={announceResult}
                  disabled={announcing}
                  className={`w-full px-6 py-3 rounded-md font-semibold text-white transition ${
                    announcing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {announcing ? "Announcing..." : "📣 Announce Result"}
                </button>
              )}
            </div>
          )}
        </div>
    
    );
    
};
export default PostResult;

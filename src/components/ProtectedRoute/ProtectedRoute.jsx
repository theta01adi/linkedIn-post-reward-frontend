import { useNavigate } from "react-router-dom";
import { useWeb3State } from "../../context/useWeb3Context";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isWalletConnected, web3State } = useWeb3State();
  const { contractInstance } = web3State;

  const [isRegistered, setIsRegistered] = useState(null); // null = loading

  useEffect(() => {
    const walletStatus = localStorage.getItem("isWalletConnected");

    // If wallet is not connected, redirect
    if (!walletStatus) {
      alert("Connect your wallet first!");
      navigate("/");
      return;
    }

    const fetchUserRegister = async () => {
      try {
        const registerStatus = await contractInstance?.isUserRegistered();
        console.log("User registered:", registerStatus);
        setIsRegistered(registerStatus);
      } catch (err) {
        console.error("Error checking user registration:", err);
        setIsRegistered(false);
      }
    };

    // Only call if contract is ready and wallet connected
    if (contractInstance && isWalletConnected) {
      fetchUserRegister();
    }
  }, [contractInstance, isWalletConnected, navigate]);

  // Redirect if explicitly not registered
  useEffect(() => {
    if (isRegistered === false) {
      navigate("/register");
    }
  }, [isRegistered, navigate]);

  if (isRegistered === null) {
    return <div>Loading...</div>; // Or any spinner
  }

  return children;
};

export default ProtectedRoute;

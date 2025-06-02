import { useEffect } from "react";
import { useWeb3State } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";

const WalletConnect = () => {
  const { web3State, isWalletConnected, connectWallet } = useWeb3State();
  const { accountAddress } = web3State;
  const navigate = useNavigate();

  useEffect(()=> {
    if(isWalletConnected){
      navigate("/home")
    }
  } ,[ isWalletConnected])

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
        {isWalletConnected ? (
          <span className="text-green-100 bg-green-700 px-5 py-2 rounded-xl border border-green-500 font-mono tracking-wide text-sm">
            {`${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`}
          </span>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-sm border border-cyan-500"
          >
            Connect Wallet
          </button>
        )}

        {!isWalletConnected && (
          <a
            href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            No MetaMask? Install here
          </a>
        )}
      </div>
    </main>
  );
};

export default WalletConnect;

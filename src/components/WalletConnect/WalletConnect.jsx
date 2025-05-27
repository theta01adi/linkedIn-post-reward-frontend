import { useWeb3State } from "../../context/useWeb3Context";

const WalletConnect = () => {
  const { web3State, isWalletConnected, connectWallet } = useWeb3State();
  const { accountAddress } = web3State;

  return (
    <div className="flex items-center">
      {isWalletConnected ? (
        <span className="text-cyan-200 bg-green-700 px-4 py-2 rounded-md border border-green-400 font-mono">
          {`${accountAddress.slice(0, 6)}...${accountAddress.slice(-4)}`}
        </span>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-cyan-800 text-blue-100 px-4 py-2 border border-cyan-400 rounded-md font-semibold hover:bg-cyan-700 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;

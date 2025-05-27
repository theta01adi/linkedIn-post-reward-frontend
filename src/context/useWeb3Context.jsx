import { useContext } from "react";
import { Web3Context } from "./web3Context";

export const useWeb3State = () => useContext(Web3Context)
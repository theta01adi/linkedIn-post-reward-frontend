
import WalletConnect from './components/WalletConnect.jsx'
import Web3Provider from './context/Web3Provider.jsx'

function App() {

  return (
    <>
    <Web3Provider>
    <WalletConnect/>
    </Web3Provider>
    </>
  )
}

export default App

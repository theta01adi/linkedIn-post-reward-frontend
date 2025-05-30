
import PostSubmit from './components/PostSubmit/PostSubmit.jsx'
import UserRegistration from './components/UserRegistration/UserRegistration.jsx'
import WalletConnect from './components/WalletConnect/WalletConnect.jsx'
import Web3Provider from './context/Web3Provider.jsx'

function App() {

  return (
    <>
    <Web3Provider>
    <WalletConnect/>
    <PostSubmit/>
    {/* <UserRegistration/> */}
    </Web3Provider>
    </>
  )
}

export default App

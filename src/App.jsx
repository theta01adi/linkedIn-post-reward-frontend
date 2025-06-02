import { RouterProvider } from 'react-router-dom'
import Web3Provider from './context/Web3Provider.jsx'
import { routes } from './routes/routes.jsx'

function App() {

  return (
    <>
    <Web3Provider>
    <RouterProvider router={routes}/>
    </Web3Provider>
    </>
  )
}

export default App

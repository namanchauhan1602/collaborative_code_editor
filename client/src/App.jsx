import { Outlet } from 'react-router-dom'
import Home from './components/Home'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster position='top-center'></Toaster>
      <Outlet />
    </>
  )
}

export default App

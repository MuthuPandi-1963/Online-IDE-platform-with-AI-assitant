import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './store/Context/AuthContext.jsx'
import store from './store/Redux/ReduxStore.jsx'
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
      <ToastContainer position="top right" autoClose={3000}/>
    </AuthContextProvider>
    </BrowserRouter>
  </Provider>
)

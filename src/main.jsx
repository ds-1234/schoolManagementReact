import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <ToastContainer/>

    <App />
  </NextUIProvider>
)

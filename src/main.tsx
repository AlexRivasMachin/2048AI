import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './Styles/index.css'
import {
  
  BrowserRouter,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.StrictMode>
     <BrowserRouter>
      <App />
     </BrowserRouter>
   </React.StrictMode>
  </React.StrictMode>,
)

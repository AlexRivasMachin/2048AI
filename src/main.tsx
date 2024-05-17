import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import Game from './Components/Game.tsx'
import ErrorPage from "./error-page";
import './Styles/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Game />,
      },
      {
        path: "/classic",
        element: <Game />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

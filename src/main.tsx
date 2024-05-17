import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import Game from './Components/Game.tsx'
import GameClassic from './Components/GameClassic.tsx'
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
        element: <GameClassic />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"

import App from './App'
import Home from './components/Home'
import CreateAccount from './components/CreateAccount'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'

import './index.tailwind.css'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />} >
        <Route index element={<Home />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-out" element={<SignOut />} />
      </Route>
    )
  )

  ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
  

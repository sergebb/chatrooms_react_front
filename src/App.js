import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import { Login } from './pages/login'
import { Singup } from './pages/singup'
import { Singin } from './pages/singin'
import { Profile } from './pages/profile'
import { Chatrooms } from './pages/chatrooms'
import { CreateChatroom } from './pages/create_chatroom'
import { Room } from './pages/room'
import { verifyAuth } from "./utils/auth";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<RequireAuth> <Chatrooms /> </RequireAuth>} />
        <Route path="/create" element={<RequireAuth> <CreateChatroom /> </RequireAuth>} />
        <Route path="/room/:roomId" element={<RequireAuth> <Room /> </RequireAuth>} />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthPending, setIsAuthPending] = useState(true);

  const verify = verifyAuth()
  
  verify.then( (ret) => {
    setIsAuth(ret)
    setIsAuthPending(false)
  })

  if (isAuthPending) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return children
  }

  return < Navigate to={{ pathname: '/login'}} />
}

export default App;

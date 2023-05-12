import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import "./App.css";
import Home from "../Home/Home";
import Albums from "../Albums/Albums";
import AlbumDetail from "../AlbumDetail/AlbumDetail";
import Profile from "../Profile/Profile";
import { AuthContext } from "../../context/AuthProvider";
import AddReviewModal from "../../components/Modal/Review";

import SearchModal from "../../components/Modal/SearchModal/SearchModal";
import ModalManager from "../../components/Modal/ModalManager";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <main className="App">
      {auth.user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
      <ModalManager />
    </main>
  );
}

export default App;

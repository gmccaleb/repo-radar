import "./App.css";

import { Routes, Route } from "react-router";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Favorites from "./components/Favorites";
import Compare from "./components/Compare";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:username" element={<UserProfile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

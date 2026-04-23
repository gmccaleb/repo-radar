import './App.css'
import './layout/layout.css'
import { Routes, Route } from "react-router";
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './components/Home';
import SearchResults from './components/SearchResults';

function App() {

  return (
    <>
    <div className="app-container">
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/results' element=<SearchResults /> />
        </Routes>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App

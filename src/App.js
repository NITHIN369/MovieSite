import Header from "./components/header/Header.js";
import Bottomnavigation from "./components/navbar/Navbar.js";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Homepage from "./components/pages/HomePage.js";
import Movies from "./components/pages/Movies.js";
import Search from "./components/pages/search.js";
import Series from "./components/pages/series.js";  
import './App.css';
function App() {
  return (
    <Router>
     <Header />
    <div className="App">
      <Routes>
      <Route path="/" element={<Homepage />} exact/>
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path="/search" element={<Search />} />
      </Routes>
    </div>
    <Bottomnavigation></Bottomnavigation>
    </Router>
  );
}

export default App;

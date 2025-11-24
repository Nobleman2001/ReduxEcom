import { Route, Routes } from "react-router";
import "./App.css";
import Filterbutton from "./components/Layout/Filterbutton";
import Header from "./components/Layout/Header";
import Home from "./components/Page/Home";
import Hero from "./components/Landingpage/Hero";

function App() {
  return (
    <div>
      <Header />
      <Filterbutton />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

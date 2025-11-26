import { Route, Routes } from "react-router";
import "./App.css";
import FilterButton from "./components/Layout/FilterButton";
import Header from "./components/Layout/Header";
import CategoryRender from "./components/Page/Books/CategoryRender";
import Subject from "./components/Page/Books/Subject";
import Home from "./components/Page/Home";

function App() {
  return (
    <div>
      <Header />
      <FilterButton />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books/subject" element={<Subject />}>
            <Route path=":category" element={<CategoryRender />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

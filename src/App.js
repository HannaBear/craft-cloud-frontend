import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";
import Home from "./Home";
import Categories from "./Categories";
import NewCategoryForm from "./NewCategoryForm";
import CategoryDetails from "./CategoryDetails";
import CraftDetails from "./CraftDetails"


function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log("data", data);
      });
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories categories={categories}/>} />
        <Route path="/categories/:id" element={<CategoryDetails categories={categories}/>} />
        <Route path="/categories/new" element={<NewCategoryForm />} />
        <Route path="/crafts/:id" element={<CraftDetails />} />
      </Routes>
    </>
  );
}

export default App;
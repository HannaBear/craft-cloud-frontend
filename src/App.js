import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.css";
import "./Card.css";
import Home from "./Home";
import Categories from "./Categories";
import NewCategoryForm from "./NewCategoryForm";
import CategoryDetails from "./CategoryDetails";
import CraftDetails from "./CraftDetails";
import EditCategory from "./EditCategory";
import NewCraftForm from "./NewCraftForm";
import EditCraft from "./EditCraft";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleDeleteCategory = (deletedCategory) => {
    console.log("id from in handleDelete", deletedCategory.id);
    const newCategories = categories.filter(
      (category) => category.id != deletedCategory.id
    );
    setCategories(newCategories);
  };


  //// ooops added a category toooo
  const handleDeleteCraft = (category, deletedCraft) => {
    // map through certain category to find craft with the deletedcraft id
    const updatedCrafts = category.crafts.filter(
      (craft) => craft.id != deletedCraft.id
    );
    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        updateCategory.crafts = updatedCrafts
        return updatedCategory;
      } else {
        return category;
      }
    });
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // function handleAddCraft(updatedCategory) {
  //   const updatedCategories = categories.map((category) => {
  //     if (category.id === updatedCategory.id) {
  //       return updatedCategory;
  //     } else {
  //       return category;
  //     }
  //   });
  //   setCategories(updatedCategories);
  // }

  const handleEditCategory = (editedCategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === editedCategory.id) {
        return editedCategory;
      } else {
        return category;
      }
    });
    setCategories(updatedCategories);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categories"
          element={<Categories categories={categories} />}
        />
        <Route
          path="/categories/new"
          element={<NewCategoryForm onAddCategory={handleAddCategory} />}
        />
        <Route
          path="/categories/:id"
          element={
            <CategoryDetails
              categories={categories}
              onRemoveCategory={handleDeleteCategory}
            />
          }
        />
        <Route
          path="/categories/:id/edit"
          element={
            <EditCategory
              categories={categories}
              onEditCategory={handleEditCategory}
            />
          }
        />

        <Route
          path="/categories/:category_id/crafts/:id"
          element={<CraftDetails categories={categories} onDeleteCraft={handleDeleteCraft} />}
        />

        <Route
          path="/categories/:id/new"
          element={
            <NewCraftForm
              categories={categories}
              onAddCategory={handleAddCategory}
            />
          }
        />

        {/* Not working :( */}
        <Route
          path="/categories/:category_id/crafts/:id/edit"
          element={<EditCraft categories={categories} />}
        />
      </Routes>
    </>
  );
}

export default App;

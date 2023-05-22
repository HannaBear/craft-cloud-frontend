import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import CraftCard from "./CraftCard";

const CategoryDetails = ({ categories, onDeleteCategory }) => {
  const { id } = useParams();
  const location = useLocation();
  const editUrl = location.pathname + "/edit";
  const newCraftUrl = location.pathname + "/new";
  const category = categories.find((c) => c.id == id);

  const handleDeleteClick = () => {
    fetch(`http://localhost:9292/categories/${id}`, {
      method: "DELETE",
    });
    onDeleteCategory(id);
  };

  return category != undefined ? (
    <div>
      <h1 className="title">{category.name}</h1>
      <div className="content">
        <img id="yarnpic" src={category.image} alt="category" />
      </div>
      <div>
        <br />
        <div className="text">
          <h4> {category.description}</h4>
          <br />
          <div className="sidebtn, btn">
            <Link to={editUrl}>
              <button>Edit Category</button>
            </Link>
            <button onClick={() => handleDeleteClick(id)}>
              Delete Category
            </button>
          </div>
        </div>
        <div className="text">
          <h2>{category.name} Projects</h2>
        </div>
        {category.crafts.map((craft) => (
          <CraftCard key={craft.id} craft={craft} category={category} />
        ))}

        <br />
        <br />
      </div>
      <div>
        <h4>Difficulty:</h4>
        <p> 💚 Easy, 🧡🧡 Medium, ❤️❤️❤️ Hard </p>
        <div className="btn" id="projectbtn">
          <Link to={newCraftUrl}>
            <button>Add a {category.name} Craft</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
      <br />
      <br />
      <br />
      <h1 className="title">Loading...</h1>
    </>
  );
};

export default CategoryDetails;

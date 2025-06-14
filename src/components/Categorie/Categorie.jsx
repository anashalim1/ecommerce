import React from "react";
import { Link } from "react-router-dom"; // Link is used to create links to other pages in the application

export default function Categorie({ categorie }) {
  return (
    <>
      <section>
        <Link to={`/categories/${categorie._id}/${categorie.name}`}>
          <div className="card">
            <img
              src={categorie.image}
              alt={categorie.name}
              className="card-img-top rounded-md  h-60  mx-auto"
            />
          </div>
          <div className="text-center mt-2">
            <h5 className="card-title font-bold">{categorie.name}</h5>
          </div>
        </Link>
      </section>
    </>
  );
}

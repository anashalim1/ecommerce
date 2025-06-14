import React from "react";
import { Link } from "react-router-dom"; // Link is used to create links to other pages in the application

export default function Brand({ brand }) {
  return (
    <>
      <section>
        
        <Link to={`/filterproducts/${brand._id}/${brand.name}`}>
        <div className="card">
          <img
            src={brand.image}
            alt={brand.name}
            className="card-img-top rounded-md "
          />
        </div>
        </Link>
        
      </section>
    </>
  );
}

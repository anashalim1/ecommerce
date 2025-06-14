import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Link is used to create links to other pages in the application
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  async function addingToCart(productId) {
    const res = await addToCart(productId);
    if (res.status == "success") {
      toast.success("Product added to cart successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.error("Error adding product to cart!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }
  return (
    <>
      <div key={product._id} className="w-full md:w-1/2 lg:w-1/5 p-4 group">
        <Link to={`/product-details/${product._id}/${product.category.name}`}>
          {/* Link is used to navigate to the product details page when the product card is clicked */}

          {/* we put the whole product inside the link(anchor) so it become clickable */}
          <div className="card">
            <img
              src={product.imageCover}
              alt={product.title}
              className="card-img-top rounded-md "
            />
            <div className="card-body">
              <h5 className="card-title font-bold">{product.title}</h5>
              <p className="card-category text-green-500 font-bold">
                {product.category.name}
              </p>
              <p className="card-text line-clamp-2 text-gray-700 font-bold">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="card-text text-emerald-800 font-extrabold">
                  ${product.price}
                </p>
                <div className="flex gap-2">
                  <p className="">{product.ratingsAverage}</p>
                  <i className="fas fa-star pt-1 text-amber-400"></i>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* we put the button after the link so if we cllicked the button , we dont get routed to the product details page*/}
        <button
          onClick={() => addingToCart(product._id)}
          type="button"
          className="opacity-0 group-hover:opacity-100 focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

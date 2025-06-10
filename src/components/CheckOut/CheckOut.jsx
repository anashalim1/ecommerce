import React from "react";
import { FloatingLabel } from "flowbite-react";
import { Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext ,useEffect} from "react";
import { CartContext } from "../../context/CartContext";
export default function CheckOut() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handlePayment, numberOfCartItems } = useContext(CartContext); // Importing handlePayment function from CartContext to handle payment processing
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    // Initial values for the form fields , used by Formik
    details: "Address details",
    city: "Cairo",
    phone: "544",
  };

  async function onSubmit(values) {
    console.log("Form submitted with values:", values);
    const res = await handlePayment(values, isOnline); // Call the handlePayment function with the form values
    if (res.status === "success") {
      console.log("Payment successful:", res);
      if (isOnline) {
        location.href = res.session.url; // there is a url in the api of online payment , we get directed to it if the payment is succeful
      } else {
        toast.success("Payment successful!", {
          theme: "dark",
          position: "bottom-right",
        });

        setTimeout(() => {
          navigate("/allorders"); // Navigate to the home page after successful payment
        }, 2000);
      }
    } else {
      toast.error("Payment failed!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }

  const formik = useFormik({
    // useFormik is a hook provided by Formik to manage form state and validation
    initialValues,
    onSubmit,
  });
useEffect(()=>{
  document.title = "Checkout";
  window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
},[]) 
  return (
    <>
      {numberOfCartItems ? (
        <section className="p-10">
          <div className="container mx-auto px-3">
            <div className="max-w-xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Checkout </h2>

              <form onSubmit={formik.handleSubmit} className="">
                {/* on submit the function handlesubmit اللي جوا الفورمك هتشتغل */}
                <FloatingLabel
                  className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500 b"
                  variant="filled"
                  label="Address details"
                  type="text"
                  name="details" // name is used to identify the input field in the formik values object
                  value={formik.values.details} // value is the current value of the input field
                  onChange={formik.handleChange} //
                  onBlur={formik.handleBlur} // onBlur is called when the input field loses focus , used to trigger validation as soon as the user loses focus from the input field not wait untill clicking submit
                />

                <FloatingLabel
                  className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
                  variant="filled"
                  label="city"
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <FloatingLabel
                  className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
                  variant="filled"
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="flex items-center mb-4">
                  <input
                    onChange={() => setIsOnline(!isOnline)} // toggle the isOnline state when the checkbox is clicked
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    Pay online ?
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Pay now
                </Button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-h-[200px] font-bold">
          <span>
            There is no items in your cart, you can start shopping from
          </span>
          <Link className="underline text-blue-600 pl-1.5 text-lg " to={"/"}>
            Here
          </Link>
        </div>
      )}
    </>
  );
}

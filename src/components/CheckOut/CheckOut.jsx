import React from "react";
import { FloatingLabel } from "flowbite-react";
import { Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
export default function CheckOut() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handlePayment, numberOfCartItems } = useContext(CartContext); // Importing handlePayment function from CartContext to handle payment processing
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    // Initial values for the form fields , used by Formik
    address: "anassanas",
    city: "Menoufia",
    phone: "01111111111",
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
  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("city is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?\d+$/, "Invalid phone number ")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
  });
  const formik = useFormik({
    // useFormik is a hook provided by Formik to manage form state and validation
    initialValues,
    onSubmit,
    validationSchema,
  });
  useEffect(() => {
    document.title = "Checkout";
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <>
      {numberOfCartItems ? (
        <section className="p-10">
          <div className="container mx-auto px-3">
            <div className="max-w-xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Checkout </h2>

              <form onSubmit={formik.handleSubmit} className="">
                {/* on submit the function handlesubmit اللي جوا الفورمك هتشتغل */}

                <div className="relative mb-6 ">
                  <input
                    type="address"
                    name="address"
                    id="address"
                    value={formik.values.address} // value is the current value of the input field
                    onChange={formik.handleChange} //
                    onBlur={formik.handleBlur} // onBlur is called when the input field loses focus , used to trigger validation as soon as the user loses focus from the input field not wait untill clicking submit
                    placeholder=" "
                    className="block pb-6 pt-4 w-full text-lg font-semibold text-gray-900 bg-gray-200 rounded-lg border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer p-4"
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Address details
                  </label>
                </div>
                {formik.errors.address && formik.touched.address && (
                  <span className="text-red-500 inline-block mb-4 font-bold">
                    {formik.errors.address}
                  </span>
                )}

                <div className="relative mb-6 ">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city} // value is the current value of the input field
                    onChange={formik.handleChange} //
                    onBlur={formik.handleBlur} // onBlur is called when the input field loses focus , used to trigger validation as soon as the user loses focus from the input field not wait untill clicking submit
                    placeholder=" "
                    className="block pb-6 pt-4 w-full text-lg font-semibold text-gray-900 bg-gray-200 rounded-lg border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer p-4"
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    City
                  </label>
                </div>
                {formik.errors.city && formik.touched.city && (
                  <span className="text-red-500 inline-block mb-4 font-bold">
                    {formik.errors.city}
                  </span>
                )}

                <div className="relative mb-6 ">
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=" "
                    className="block pb-6 pt-4 w-full text-lg font-semibold text-gray-900 bg-gray-200 rounded-lg border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer p-4"
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Phone number
                  </label>
                </div>
                {formik.errors.phone && formik.touched.phone && (
                  <span className="text-red-500 inline-block mb-4 font-bold">
                    {formik.errors.phone}
                  </span>
                )}

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
                  disabled={!(formik.isValid && formik.dirty) || isLoading}
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

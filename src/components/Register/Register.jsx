import React from "react";
import { FloatingLabel } from "flowbite-react";
import { Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    // Define the validation schema using Yup , to be used with Formik

    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("RePassword is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const initialValues = {
    // Initial values for the form fields , used by Formik
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  /*   function validatevalues(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "name is Required";
    }
    if (!values.email) {
      errors.email = "email is Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "password is Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.rePassword) {
      errors.rePassword = "repassword is Required";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Passwords do not match";
    }
    return errors;
  } */

  async function onSubmit(values) {
    // Function to handle form submission
    // happens when the form is submitted
    // it will be called by Formik
    // it will receive the form values as an argument
    setIsLoading(true); // Set loading state to true to indicate that the form is being submitted
    // this will be used to disable the submit button and show a loading indicator
    try {
      const { data } = await axios.post(
        //data is decstructured from the response of the API call
        "https://ecommerce.routemisr.com/api/v1/auth/signup", // contacting the api server to register the user
        values
      );
      if (data.message === "success") {
        navigate("/login");
      }
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false); // when the API call is done, set loading state to false
      // this will be used to hide the loading indicator
    }
  }
  const formik = useFormik({
    // useFormik is a hook provided by Formik to manage form state and validation
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className="p-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          <div className="w-full md:w-1/3" >
            <h2 className="text-4xl font-bold mb-6">Register form</h2>
          {error && ( // if there is an error FROM the API , show an alert with the error message , for example, if the email is already registered
            <Alert color="failure">
              <span className="">{error}</span>
            </Alert>
          )}
          </div>
          <form onSubmit={formik.handleSubmit} className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-md">
            {/* Name */}
            <div className="relative mb-6 ">
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 bg-gray-200 px-2 top-2 left-1 z-10 transition-all duration-200 transform scale-75 -translate-y-4 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                Name
              </label>
              {formik.errors.name && formik.touched.name && (
                <span className="text-red-500 inline-block mt-1">
                  {formik.errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="relative mb-6">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 bg-gray-200 px-2 top-2 left-1 z-10 transition-all duration-200 transform scale-75 -translate-y-4 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                Email
              </label>
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-500 inline-block mt-1">
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 bg-gray-200 px-2 top-2 left-1 z-10 transition-all duration-200 transform scale-75 -translate-y-4 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-500 inline-block mt-1">
                  {formik.errors.password}
                </span>
              )}
            </div>

            {/* rePassword */}
            <div className="relative mb-6">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="rePassword"
                className="absolute text-sm text-gray-500 bg-gray-200 px-2 top-2 left-1 z-10 transition-all duration-200 transform scale-75 -translate-y-4 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                Confirm Password
              </label>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <span className="text-red-500 inline-block mt-1">
                  {formik.errors.rePassword}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="relative mb-6">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 bg-gray-200 px-2 top-2 left-1 z-10 transition-all duration-200 transform scale-75 -translate-y-4 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                Phone
              </label>
              {formik.errors.phone && formik.touched.phone && (
                <span className="text-red-500 inline-block mt-1">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            <Button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

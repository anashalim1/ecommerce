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
      <div className="container mx-auto px-3">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Register form</h2>
          {error && ( // if there is an error FROM the API , show an alert with the error message , for example, if the email is already registered
            <Alert color="failure">
              <span className="">{error}</span>
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit} className="">
            {/* on submit the function handlesubmit اللي جوا الفورمك هتشتغل */}
            <FloatingLabel
              className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
              variant="filled"
              label="Name"
              type="text"
              name="name"
              value={formik.values.name} // value is the current value of the input field
              onChange={formik.handleChange} //
              onBlur={formik.handleBlur} // onBlur is called when the input field loses focus , used to trigger validation as soon as the user loses focus from the input field not wait untill clicking submit
            />
            {formik.errors.name &&
              formik.touched.name && ( // the validition error maeeage , happens if these is 1-error the the input and 2- the input lost user focus(clicked some where else )
                <span className="text-red-500 inline-block mb-4">
                  {formik.errors.name}{" "}
                  {/* the error message from the validation schema related to the name*/}
                </span>
              )}
            <FloatingLabel
              className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
              variant="filled"
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 inline-block mb-4">
                {formik.errors.email}
              </span>
            )}
            <FloatingLabel
              className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
              variant="filled"
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-red-500 inline-block mb-4">
                {formik.errors.password}
              </span>
            )}
            <FloatingLabel
              className="mb-4 [&>input]:text-gray-900 [&>label]:text-gray-500"
              variant="filled"
              label="rePassword"
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <span className="text-red-500 inline-block mb-4">
                {formik.errors.rePassword}
              </span>
            )}
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
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-500 inline-block mb-4">
                {formik.errors.phone}
              </span>
            )}
            <Button // on defult is disabled , it will be enabled when the form is valid and the initial values are changed(formik.dirty)
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
            >
              {isLoading ? "Loading..." : "Register"}{" "}
              {/* if isLoading is true, show Loading... else show Register */}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

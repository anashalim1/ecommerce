import React from "react";
import { FloatingLabel } from "flowbite-react";
import { Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthToken } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        setAuthToken(data.token);
        localStorage.setItem("authToken", data.token);
        navigate("/");
      }
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className="p-10">
      <div className="container mx-auto px-3">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Login </h2>
          {error && (
            <Alert color="failure">
              <span className="">{error}</span>
            </Alert>
          )}
          <form
            onSubmit={formik.handleSubmit}
            className="bg-gray-800 py-20 px-6 rounded-lg shadow-md"
          >
            <div className="relative mb-6">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>

            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 inline-block mb-4 font-bold">
                {formik.errors.email}
              </span>
            )}
            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="password"
                className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
            </div>

            {formik.errors.password && formik.touched.password && (
              <span className="text-red-500 inline-block mb-4 font-bold">
                {formik.errors.password}
              </span>
            )}

            <div className="flex justify-between ">
              <Button
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                type="submit"
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </Button>
              <Link className=" text-white" to={"/forget-password"}>
                Forgot Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

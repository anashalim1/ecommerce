import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const initialValues = {
    email: "",
  };
  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (data.message === "success") {
        navigate("/verify-code");
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
    <>
      <section className="p-10">
        <div className="my-3 font-bold text-2xl">
          <h1>please enter your email address</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-6 w-1/2">
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
          <div>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              onClick={() => {
                navigate("/verify-code");
              }}
              type="submit"
              className={`px-4 py-2 font-bold rounded-lg text-white ${
                formik.isValid && formik.dirty
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Send Verification Code
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

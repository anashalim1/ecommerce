import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const initialValues = {
    email: "",
    newPassword: "",
  };

  async function onSubmit(values) {
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(data);
      if (data.token ) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error.response.data.message);
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
          <h1>please enter your email</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="relative mb-6 w-1/2">
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
          <div className="my-3 font-bold text-2xl">
            <h1>please enter your new password</h1>
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="newPassword"
              className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          <div>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              onClick={() => {}}
              type="submit"
              className={`px-4 py-2 font-bold rounded-lg text-white ${
                formik.isValid && formik.dirty
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

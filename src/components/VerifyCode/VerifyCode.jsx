import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function VerifyCode() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^\d+$/, "Code must contain only numbers")
      .required("Validation Code is required"),
  });
  const initialValues = {
    resetCode: "",
  };

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (data.status === "Success") {
        navigate("/reset-password");
        console.log("Verification successful");
      }
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error code:", error.response.data.message);
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
          <h1>please enter your verfication code</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-6 w-1/2">
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=" "
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="resetCode"
              className="absolute text-m rounded-2xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-200 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Verfication code
            </label>
          </div>
          <div>
            {/* Show validation error */}
            {formik.touched.resetCode && formik.errors.resetCode && (
              <span className="text-red-500 block mb-4 font-bold ">
                {formik.errors.resetCode}
              </span>
            )}

            {/* Show backend error */}
            {error && (
              <span className="text-red-500 block mb-4 font-bold">
                {error}
              </span>
            )}
          </div>
          <div>
            <button
              disabled={!(formik.isValid && formik.dirty)}
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

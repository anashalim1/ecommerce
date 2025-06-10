import React from "react";
import { FloatingLabel } from "flowbite-react";
import { Button, Alert } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

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
          <form onSubmit={formik.handleSubmit} className="">
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

            <Button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

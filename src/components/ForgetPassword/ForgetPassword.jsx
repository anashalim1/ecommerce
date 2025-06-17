import React from "react";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const navigate = useNavigate();
  return (
    <>
      <section className="p-10">
        <div className="my-3 font-bold text-2xl">
          <h1>please enter your email address</h1>
        </div>
        <form action="">
          {" "}
          <div className="relative mb-6 w-1/2">
            <input
              type="email"
              name="email"
              id="email"
              // value={formik.values.email}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
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
          <div>
            <button
              onClick={() => {
                navigate("/verify-code");
              }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white  font-bold rounded-lg"
            >
              Send Verification Code
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

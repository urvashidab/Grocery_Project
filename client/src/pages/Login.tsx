import { useState } from "react";
import img from "../assets/images/img1.jpg";
import { NavLink } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword((prev) => !prev);
  };

  const toggleLoginMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <>
      {/* top layer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* image is only for large screen */}

        {/* left side starts - image */}

        <div className="hidden lg:block  ">
          <img
            src={img}
            className="w-full max-h-screen object-cover opacity-50"
            alt="fashion"
          />
        </div>
        {/* left side ends */}

        {/* right side starts */}
        <div className="flex flex-col gap-6 justify-start ">
          <h1 className="text-center text-2xl tracking-widest font-light">
            {isLoginMode ? "LOG IN" : "REGISTER"}
          </h1>

          {/* form */}
          <form id="loginForm" className="flex flex-col gap-4  mt-6">
            {/* name */}
            {!isLoginMode && (
              <input
                type="text"
                required
                placeholder="NAME"
                className="border-b  mb-2 border-gray-400  py-2 px-2 outline-none placeholder:text-gray-400 "
              ></input>
            )}
            {/* email */}
            <input
              type="email"
              required
              placeholder="E-MAIL"
              className="border-b  mb-2 border-gray-400  py-2 px-2 outline-none placeholder:text-gray-400 "
            ></input>
            {/* password */}
            <div className="relative">
              <input
                type={hidePassword ? "text" : "password"}
                required
                placeholder="PASSWORD"
                className="w-full border-b border-gray-400 py-2 px-2 outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={toggleHidePassword}
                className="absolute right-2 top-2 cursor-pointer text-lg text-gray-500 hover:text-black"
              >
                {hidePassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {/* {!isLoginMode && (
              <input
                type="password"
                required
                placeholder="CONFIRM PASSWORD"
                className="border-b border-gray-400 py-2 px-2 outline-none placeholder:text-gray-400"
              />
            )} */}

            {isLoginMode ? (
              <NavLink to="/resetpassword">
                <span className="text-sm text-black  font-extralight underline">
                  Have you forgotten your password?
                </span>
              </NavLink>
            ) : (
              <div className="flex gap-1 text-sm">
                <p className="text-gray-400">Already have an account?</p>

                <button
                  type="button"
                  onClick={toggleLoginMode}
                  className="underline cursor-pointer"
                >
                  LOG IN
                </button>
              </div>
            )}

            {/* login button */}

            <div className="flex gap-6 mt-10 flex-col lg:flex-row ">
              <button type="submit" className="flex-1 primaryBtn">
                {isLoginMode ? "LOG IN" : "REGISTER"}
              </button>
              {/* register */}
              <button
                onClick={toggleLoginMode}
                type="button"
                className="flex-1 primaryBtn"
              >
                {isLoginMode ? "REGISTER" : "BACK TO LOG IN"}
              </button>
            </div>
          </form>

          <div className="flex text-sm mt-10 ">
            <div className="flex gap-1">
              <p className="text-gray-400 ">Need Help?</p>
              <NavLink to="/contact">
                <p className="text-sm text-black text-underline font-extralight underline">
                  Contact Us
                </p>
              </NavLink>
            </div>
          </div>

          {/* right side ends */}
        </div>
      </div>
    </>
  );
};

export default Login;

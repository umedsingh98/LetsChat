import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    bio: "",
  });

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currState === "Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />

      {/* Right */}
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg "
      >
        <h1 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h1>
        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFormData({...formData, fullname: e.target.value })}
            value={formData.fullname}
            type="text"
            className="py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setFormData({...formData, email: e.target.value })}
              value={formData.email}
              type="email"
              placeholder="Email Address"
              className="py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              onChange={(e) => setFormData({...formData, password: e.target.value })}
              value={formData.password}
              type="password"
              placeholder="Password"
              className="py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            rows={3}
            placeholder="Write your bio..."
            onChange={(e) => setFormData({...formData, bio: e.target.value })}
            value={formData.bio}
            className="py-2 px-4 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-md cursor-pointer"
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="cursor-pointer" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="ml-1 text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign Up");
                  setIsDataSubmitted(false);
                }}
                className="ml-1 text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

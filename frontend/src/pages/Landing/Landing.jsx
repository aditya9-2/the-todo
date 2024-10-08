// import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />

      <div className="w-full flex flex-col justify-center items-center bg-white min-h-[calc(100vh-64px)]">
        <h1 className="text-[75px] text-black text-center mb-4">
          Manage your life <span className="text-blue-500">easily</span>
        </h1>
        <h2 className="text-[38px] text-black text-center mt-4">
          The only <span className="text-blue-500">todo</span> you need
        </h2>
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Link to="/login">Get Started</Link>
        </button>
      </div>
    </>
  );
};

export default Landing;

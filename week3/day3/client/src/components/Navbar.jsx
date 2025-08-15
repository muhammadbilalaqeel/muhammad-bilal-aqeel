import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { userContextValue } from "../context/userContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const {userData,setUserData} = useContext(userContextValue);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUserData(null)
    toast.success('Logout Successfully')
    navigate('/')
  };
  return (
    <nav className="flex items-center w-full  justify-between md:px-8 px-2 h-20">
      <div className="flex items-center justify-between w-full ">
        <Link to={"/"}>
          {" "}
          <h2 className="md:text-xl text-lg font-semibold">
            {" "}
            <span className="grad md:text-2xl">&lt;</span>Task Manager{" "}
            <span className="grad md:text-2xl"> &#47; &gt;</span>
          </h2>{" "}
        </Link>
        {!userData?.token ? (
          <div className="flex md:gap-4 gap-2">
            <Button
              text={"Login"}
              className={"btn-grad"}
              color={"text-white"}
              to={"/login"}
              type={"link"}
            />
            <Button
              text={"Sign Up"}
              className={"btn-grad sm:inline-block hidden"}
              to={"/signup"}
              type={"link"}
            />
          </div>
        ) : (
          <Button text="Log Out" className={"btn-red"} onClick={handleLogOut} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

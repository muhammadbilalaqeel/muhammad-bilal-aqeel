import React, { useContext } from "react";
import Button from "./Button";
import { userContextValue } from "../context/USERContext";

const Welcome = () => {
  const { userData } = useContext(userContextValue);
  return (
    <div className="h-[calc(100vh-80px)] w-full flex items-center flex-col  justify-center gap-5">
      {/* <h1 className='text-[100px] leading-none font-bold'>Welcome To</h1> */}
      <h1 className="lg:text-[100px] md:text-[80px] sm:text-[60px] text-[35px] leading-none font-bold grad text-center">
        {" "}
        <span>&lt;</span>Task Manager<span>&#47;&gt;</span>
      </h1>
      {userData?.token && (
        <div>
          <Button
            type={"link"}
            to={"/dashboard"}
            text={"Tasks"}
            className={"btn-grad"}
          />
        </div>
      )}
    </div>
  );
};

export default Welcome;

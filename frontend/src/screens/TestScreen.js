import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const TestScreen = () => {
  const [value, setValue] = useState(0);
  let count = 0;
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    console.log(count);
    count++;
  }, [userInfo]);
  return (
    <div>
      <Link to="/test">Click Me {userInfo.name}</Link>
    </div>
  );
};

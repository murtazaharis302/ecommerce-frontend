import MyContext from "./MyContext";
import { useState } from "react";

const MyProvider = ({ children }) => {

  const [name, setName] = useState("Harris");

  return (
    <MyContext.Provider value={{ name, setName }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

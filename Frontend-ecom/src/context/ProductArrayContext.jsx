import { createContext, useState } from "react";

export const productArrayContext = createContext();

export function ProductProvider({ children }) {
  const [data, setData] = useState([]);
  const [dummyData,setDummyData]=useState([]);
  const [searched, setSearched] = useState(false);

  return (
    <productArrayContext.Provider
      value={{
        data,
        setData,
        dummyData,
        setDummyData,
        searched,
        setSearched,
      }}
    >
      {children}
    </productArrayContext.Provider>
  );
}
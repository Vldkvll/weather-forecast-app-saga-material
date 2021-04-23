import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataS, setData] = useState({
        location: "Rio de Janeiro",
        units: "metric",
        description: "Carnaval",
    });
    const setValues = (values) => {
        setData((prevData) => ({
            ...prevData,
            ...values,
        }));
    };

    console.log("1111111111111111111111111111111111111111");
    console.log(dataS);
    return (
        <DataContext.Provider value={{ dataS, setValues }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);

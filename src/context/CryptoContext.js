

import { createContext, useContext, useEffect, useState } from "react"

export const Crypto=createContext();

export default function CryptoContext({children}) {

    const [currency,setcurrency]=useState("INR");
    const [symbol,setsymbol]=useState("₹")
   
    useEffect(()=>{
        if(currency==="INR"){
            setsymbol("₹")
        }
       else if(currency==="USD"){
            setsymbol("$")
        }
    },[currency])

    const value={
        currency,setcurrency,
        symbol,setsymbol
    }

    return <Crypto.Provider value={value}>{children}</Crypto.Provider>
}

export const CrytoState=()=>{
   return useContext(Crypto);
}

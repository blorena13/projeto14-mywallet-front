import { createContext } from "react";
import { useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("");
    const [confSenha, setConfSenha] = useState("");


    return (
        <InfoContext.Provider 
        value={{
            email, setEmail, 
            nome, setNome, 
            senha, setSenha, 
            token, setToken,
            confSenha, setConfSenha,
            }}>

            {children}
        </InfoContext.Provider>
    )
}
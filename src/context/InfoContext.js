import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [usuarioLogado, setUsuarioLogado]= useState("");
    const navigate = useNavigate();
    

    const lsUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(lsUser !== null ? lsUser : {});
    

    useEffect(() => {
        if(lsUser === null){
            navigate("/")
        } 
    }, []);


    return (
        <InfoContext.Provider 
        value={{
            email, setEmail, 
            nome, setNome, 
            senha, setSenha, 
            token, setToken,
            confSenha, setConfSenha,
            user, setUser,
            usuarioLogado, setUsuarioLogado
            }}>

            {children}
        </InfoContext.Provider>
    )
}
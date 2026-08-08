import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";

import ConfirmButton from "./ConfirmButton";

const AuthCard = ({isLogin}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
       <div className=" font-primary w-full flex flex-col my-10 md:my-20">
            <div className="relative w-full max-w-xl mx-auto mt-15">
                <div className="absolute -top-6 left-4 z-10 bg-white border-3 border-neroNonNero shadow-buttons px-4 py-2 -rotate-2 ">
                   <h2 className="text-terziary font-extrabold text-2xl uppercase select-none ">SPEEDQUIZ</h2>
            </div>
       
           <form className="w-full bg-white border-3 border-neroNonNero shadow-buttons px-10 py-10 flex flex-col gap-6">
            <div className="text-center">
                <h1 className="font-extrabold text-5xl uppercase mt-4 select-none">
                    {isLogin? "Accedi" : "Crea un account"}
                </h1>
                <p className="text-black text-sm normal-case select-none">Pronto a sfidare i tuoi amici?</p>
            </div>

            {!isLogin && (
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-bold uppercase text-black">Username</label>
                    <input 
                        type="text"
                        id="username"
                        placeholder="Nome di gioco"
                        maxLength={15}
                        value={username} required
                        onChange={e => setUsername(e.target.value)} 
                        className="bg-white px-4 py-3 border-3 shadow-buttons border-neroNonNero placeholder:text-gray-500"></input>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold uppercase text-black select-none">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="nome@esempio.it"
                    value={email} required
                    onChange={e => setEmail(e.target.value)}
                    className="bg-white px-4 py-3 border-3 border-shadow border-neroNonNero placeholder:text-gray-500 shadow-buttons"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-bold uppercase text-black select-none">Password</label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        value={password} required
                        minLength={8}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-white px-4 py-3 border-3 border-neroNonNero shadow-buttons placeholder:text-gray-500"/>
                    
                    <button 
                        type="button" className="absolute top-4 right-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}> 
                            <Icon icon={showPassword ? "mdi:eye-off" : "mdi-eye"} width={22}/>
                    </button>

                </div>
            </div>

            <ConfirmButton content={isLogin ? "Accedi" : "Registrati"} 
                customClasses="bg-primary font-white text-white uppercase font-bold text-2xl py-3 mt-3">
            </ConfirmButton>

            </form>

            <p className="text-white text-center mt-6 text-sm normal-case select-none"> 
                {isLogin ? "Non hai un account?" : "Hai già un account?"}
                <Link to={isLogin ? "/register" : "/login"} 
                className="bg-secondary border-3 border-neroNonNero font-bold uppercase shadow-buttons text-black px-2 py-1 ml-2">
                {isLogin ? "Registrati" : "Accedi"}
                </Link>
            </p>
        </div>
        </div>
  )
}
export default AuthCard;

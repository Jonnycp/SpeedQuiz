import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ConfirmButton from "./ConfirmButton";


const AuthCard = ({isLogin=true}) => {
    const [showPassword, setPassword] = useState(false)    

    return (
        <div className= "relative mx-auto font-primary w-fit">
           <div className="absolute top left-4 z-10 bg-white border-3 border-neroNonNero shadow-buttons px-4 py-2">
            <h1 className="text-terziary font-extrabold text-xl uppercase select-none">SPEEDQUIZ  </h1>
           </div>

           <form className="bg-white border-3 border-neroNonNero shadow-buttons px-6 py-10 flex flex-col gap-6">
            <div className="text-center">
                <h1 className="font-extrabold text-3xl uppercase">
                    {isLogin? "Accedi" : "Crea un account"}
                </h1>
                <p className="text-black text-sm normal-case">Pronto a sfidare i tuoi amici?</p>
            </div>

            {!isLogin && (
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-bold uppercase text-block">Username</label>
                    <input 
                    type="text"
                    id="username"
                    placeholder="username"
                    className="bg-white px-4 py-3 border-3 border-shadow border-neroNonNero"></input>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold uppercase text-black">Email</label>
                <input
                type="text"
                id="email"
                placeholder="nome@esempio.it"
                className="bg-white px-4 py-3 border-3 border-shadow border-neroNonNero placeholder:text-grey normal-case"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password"
                className="font-bold uppercase text-black">Password</label>
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="bg-white px-4 py-3 border-3 border-neroNonNero border-shadow">
                </input>
                
            </div>


           </form>
        </div>

    

  )
}
export default AuthCard;

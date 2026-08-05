import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";


const AuthCard = ({isLogin=true}) => {
    const [showPassword, setPassword] = useState(false)    

    return (
        
       <div className="min-h-screen w-full flex flex-col items-center justify-center font-primary">
            <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -top-6 left-4 z-10 bg-white border-3 border-neroNonNero shadow-buttons px-4 py-2">
                   <h2 className="text-terziary font-extrabold text-xl uppercase select-none">SPEEDQUIZ</h2>
            </div>
       
           <form className="w-full bg-white border-3 border-neroNonNero shadow-buttons px-10 py-10 flex flex-col gap-6">
            <div className="text-center">
                <h1 className="font-extrabold text-4xl uppercase mt-3">
                    {isLogin? "Accedi" : "Crea un account"}
                </h1>
                <p className="text-black text-sm normal-case">Pronto a sfidare i tuoi amici?</p>
            </div>

            {!isLogin && (
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-bold uppercase text-black ">Username</label>
                    <input 
                    type="text"
                    id="username"
                    placeholder="username"
                    className="bg-white px-4 py-3 border-3 shadow-buttons border-neroNonNero"></input>
                </div>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold uppercase text-black">Email</label>
                <input
                type="text"
                id="email"
                placeholder="nome@esempio.it"
                className="bg-white px-4 py-3 border-3 border-shadow border-neroNonNero placeholder:text-gray-400 normal-case shadow-buttons"></input>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password"className="font-bold uppercase text-black">Password</label>

                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full bg-white px-4 py-3 border-3 border-neroNonNero shadow-buttons"
                    />
                    <button type="button"
                    className="absolute top-4 right-3 cursor-pointer"
                    onClick={() => setPassword(!showPassword)}> 
                        <Icon icon={showPassword ? "mdi:eye-off" : "mdi-eye"} width={22}/>
                    </button>
                </div>
                
            </div>

            <button
            type="submit"
            className="bg-primary border-3 py-3 px-3 border-neroNonNero shadow-buttons cursor-pointer hover:scale-105 text-white uppercase font-bold">
            {isLogin ? "Accedi" : "Registrati"}
            </button>
            </form>


            <p className="text-white text-center mt-6 text-sm normal-case"> 
                {isLogin ? "Non hai un account?" : "Hai già un account?"}
                <Link 
                to={isLogin ? "/register" : "/login"} 
                className="bg-secondary border-3 border-neroNonNero font-bold uppercase shadows-buttons text-black px-2 py-1 ml-2">
                {isLogin ? "Registrati" : "Accedi"}
                </Link>
            </p>

        </div>
        </div>
  )
}
export default AuthCard;

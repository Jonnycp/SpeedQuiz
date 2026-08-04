import { Link } from "react-router";
import { Icon } from "@iconify/react";

const AuthCard = ({}) => {
    const isLogin = true

    return (
        <div className= "relative w-full mx-auto font-primary">
           <div className="absolute -top-6 left-4 z-10 bg-white border-3 border-neroNonNero shadow-buttons px-4 py-2">
            <h1 className="text-terziary font-extrabold text-xl uppercase select-none">SPEEDQUIZ </h1>
           </div>

           <form className="bg-white border-3 border-neroNonNero shadow-buttons font-extrabold uppercase text-black">
            <div className="text-center">
                <h1 className="font-extrabold text-3xl">
                    {!isLogin?"Accedi" : "Crea un account"}
                </h1>
                <p className="text-black text-sm normal-case">Pronto a sfidare i tuoi amici?</p>
            </div>

            <div className="flex">
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="email"
                placeholder="nome@esempio.it"
                className="bg-white px-4 py-3 border-3 border-shadow border-neroNonNero placeholder:text-grey normal-case"></input>
            </div>

            <div className="flex flex-col gap-1">
                
            </div>



           </form>
        </div>

    

  )
}
export default AuthCard;

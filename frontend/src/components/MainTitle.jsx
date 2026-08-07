const MainTitle = ({title, className}) => {
    return(
        <h1 className={`uppercase font-extrabold tracking-wide text-white text-center ${className || "text-2xl md:text-4xl"}`}>
            {title}
        </h1>
    )
}

export default MainTitle;
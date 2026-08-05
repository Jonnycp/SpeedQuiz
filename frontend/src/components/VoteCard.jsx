import ConfirmButton from "../components/ConfirmButton";

const VoteCard = ({phrases}) => {
    return(
        <div className="rotate-1 my-10 mx-5 md:mx-28 xl:mx-72 bg-white font-primary font-extrabold flex flex-col items-start justify-center gap-5 py-5 px-8 md:py-10 md:px-12 border-3 border-neroNonNero shadow-buttons">
            <div className="flex flex-col gap-4 flex-1 mb-8">
                {phrases.map((phrase, index) => (
                <p key={index} className="italic font-extrabold text-lg md:text-xl text-black">
                    "{phrase}"
                </p>
          ))}
        </div>
        <button className="bg-secondary">cliccami</button>
        </div>
    );
};

export default VoteCard;
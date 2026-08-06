import GamePhase from "../components/GamePhase";
import Header from "../components/Header";
import ResultPlayer from "../components/ResultPlayer";
import PodiumPlayer from "../components/PodiumPlayer";
import ConfirmButton from "../components/ConfirmButton";

const Leaderboard = () => {
  return (
    <>
      <Header username="Jonathan" />
      <div>
        <h1 className="text-4xl text-white font-primary uppercase">
          Partita conclusa
        </h1>
        Abbiamo solo 3 vincitori! Fagli un applauso!
      </div>
      <section className="flex gap-8 mx-32 py-24 relative z-10">
        <PodiumPlayer position={2} username="Maria" points={800} />
        <PodiumPlayer position={1} username="Antonio" points={1000} />
        <PodiumPlayer position={3} username="Luca" points={600} />
      </section>
      <section className="flex flex-col gap-4 mx-40 relative z-10">
      <ResultPlayer username="Jonathan" position={4} points={500} />
      <ResultPlayer username="Charlie" position={5} points={300} />
      </section>
      <section className="flex justify-center gap-4 mt-10 mb-6 mx-32 border-t-3 border-dashed border-neroNonNero pt-6">
        <button className="bg-red-600 text-white italic font-extrabold text-sm md:text-xl px-3 py-1.5 md:px-6 md:py-2 border-3 border-neroNonNero shadow-buttons cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all duration-200 uppercase">
          Esci
        </button>
      </section>
    </>
  );
};

export default Leaderboard;

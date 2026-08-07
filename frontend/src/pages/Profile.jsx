import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import StatCardProfile from "../components/StatCardProfile";

const Profile = () => {
    const punti = 7083;
    const partiteVinte = 10;
    const partiteGiocate = 15;
    const percentualeVittoria = Math.round((partiteVinte / partiteGiocate) * 100);

    return (
        <>

        <div>
            <Header username="Jonathan" />
        </div>


        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-10 mx-5 md:mx-28 xl:mx-72">
            <StatCardProfile value='7083' label="Punti" bgColor="bg-primary" rotation="-rotate-1" />
            <StatCardProfile value='10' label="Partite vinte" bgColor="bg-secondary" rotation="-rotate-1" />
            <StatCardProfile value='15' label="Partite giocate" bgColor="bg-[#cac0ff]" rotation="-rotate-1" />
            <StatCardProfile value='66' label="Percentuale di vittoria" bgColor="bg-verdinoCarino" rotation="-rotate-1" />
        </div>

        <div>
            <SectionTitle title="Le tue partite" />
        </div>
        <div>
            <SectionTitle title="Il tuo profilo" />
        </div>
    </>
    )
}

export default Profile;
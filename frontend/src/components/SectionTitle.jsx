const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2 after:flex-1 after:h-0.5 after:bg-black/80 mb-6">
    <h2 className="text-lg md:text-xl -rotate-1 uppercase bg-primary border-3 border-neroNonNero shadow-[4px_4px_0_0_#000] inline py-1.5 px-3 select-none text-white md:font-extrabold font-bold">
      {title}
    </h2>
  </div>
);

export default SectionTitle;
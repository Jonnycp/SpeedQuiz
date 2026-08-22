const EmptyState = ({ message = "Nessun contenuto disponibile" }) => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="text-xl md:text-xl font-extrabold text-white uppercase -rotate-1 bg-black/20 px-8 py-2 rounded border-3 border-transparent border-dashed text-center">
        {message}
      </div>
    </div>
  );
};

export default EmptyState;
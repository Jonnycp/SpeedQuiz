const EmptyState = ({ message = "Nessun contenuto disponibile" }) => {
  return (
    <div className="w-full flex justify-center py-10">
      <p className="text-2xl md:text-3xl font-black text-white uppercase -rotate-1 bg-black/20 px-8 py-4 rounded-xl border-3 border-transparent border-dashed text-center">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
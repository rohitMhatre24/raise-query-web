const StatCard = ({ title, value, color, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white p-6 rounded-lg shadow-sm border-l-4 ${color} 
      ${active ? "ring-2 ring-blue-500" : ""} hover:scale-105 transition`}
    >
      <p className="text-sm text-gray-500 uppercase font-bold">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
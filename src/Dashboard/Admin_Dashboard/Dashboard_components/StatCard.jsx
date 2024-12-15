function StatCard({ title, value, percentage, isPositive }) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        <p className="sm:text-2xl text-xl font-bold text-blue-950">{value}</p>
        <p
          className={`text-sm font-medium mt-2 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {percentage}%
        </p>
      </div>
    );
  }
  
  export default StatCard;
  
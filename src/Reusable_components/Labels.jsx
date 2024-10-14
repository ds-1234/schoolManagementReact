const Labels = () => (
    <div className="flex items-center justify-around bg-white p-2 rounded-xl w-1/3 absolute right-5 top-32">
      <div className="flex items-center">
        <span className="text-green-400 font-bold">P</span>
        <span className="ml-2">- Present</span>
      </div>
      <div className="flex items-center">
        <span className="text-red-400 font-bold">A</span>
        <span className="ml-2">- Absent</span>
      </div>
      <div className="flex items-center">
        <span className="text-yellow-400 font-bold">HD</span>
        <span className="ml-2">- Half Day</span>
      </div>
      <div className="flex items-center">
        <span className="text-blue-400 font-bold">M</span>
        <span className="ml-2">- Medical</span>
      </div>
    </div>
  );

  export default Labels;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import BASE_URL from '../../../../conf/conf';

function AddPlayers({ isOpen, onClose }) {
  const [value, setValue] = useState(true); // Toggle button state
  const [players, setPlayers] = useState([]); // Player list
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Selected player
  const [sports, setSports] = useState([]); // Sport list
  const [selectedSport, setSelectedSport] = useState(null); // Selected sport
  const [dropdownOpen, setDropdownOpen] = useState(false); // Player dropdown
  const [dropdownOpen2, setDropdownOpen2] = useState(false); // Sport dropdown
  const [dateOfJoin, setDateOfJoin] = useState(''); // Date of joining

  const {
    register,
    formState: { errors },
    reset
  } = useForm();

  // Fetch players (students)
  // debugger
  useEffect(() => {
    axios.get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        console.log(response.data)
        const filteredPlayers = response.data.data.filter(user => user.role === 3);
        setPlayers(filteredPlayers);
        console.log(players,'players')
      })
      .catch((error) => {
        console.log(error,'error')
        toast.error('Error fetching Players');
      });
  }, []);

  // Fetch sports
  useEffect(() => {
    axios.get(`${BASE_URL}/sports/getSportsList`)
      .then((response) => {
        setSports(response.data.data);
      })
      .catch((error) => {
        toast.error('Error fetching Sports');
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure that both a player and a sport are selected
    if (!selectedPlayer || !selectedSport) {
      toast.error('Please select both a player and a sport');
      return;
    }

    // Submit the form data to the server
    axios({
      method: 'post',
      url: `${BASE_URL}/players/savePlayers`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // playersName: { id: selectedPlayer.id }, 
        userId:  selectedPlayer.id , 
        sportsName: { id: selectedSport.id }, // Send selected sport ID
        dateOfJoin: dateOfJoin, // Send date of joining
        isActive: value // Send active status
      },
    })
    .then(() => {
      toast.success('Player Created successfully!');
    //   onSuccess();
      onClose();
    })
    .catch((error) => {
      toast.error('Failed to Create Player.');
      console.error('Error Creating Player:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Add Player</h2>

          {/* Player Name Input */}
          <div className="mb-4 relative">
            <label htmlFor="playersName" className="block text-gray-700 font-semibold mb-2">Player Name</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown for players
            >
              <p>{selectedPlayer ? `${selectedPlayer.firstName} ${selectedPlayer.lastName}` : 'Select Player'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {players.map(player => (
                  <div
                    key={player.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedPlayer(player); // Set selected player
                      setDropdownOpen(false); // Close dropdown after selection
                    }}
                  >
                    {`${player.firstName} ${player.lastName}`}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sports Input */}
          <div className="mb-4 relative">
            <label htmlFor="sportsName" className="block text-gray-700 font-semibold mb-2">Sports</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for sports
            >
              <p>{selectedSport ? selectedSport.sportsName : 'Select Sports'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen2 && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {sports.map(sport => (
                  <div
                    key={sport.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedSport(sport); // Set selected sport
                      setDropdownOpen2(false); // Close dropdown after selection
                    }}
                  >
                    {sport.sportsName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date of Joining */}
          <div className="mb-4">
            <label htmlFor="dateOfJoin" className="block text-sm font-medium mb-2 text-black">Date of Joining</label>
            <input
              type="date"
              name="dateOfJoin"
              value={dateOfJoin}
              onChange={(e) => setDateOfJoin(e.target.value)} // Set date of joining
              className="block h-11 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3"
            />
          </div>

          {/* Toggle for Status */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
              Status 
            </label>
            <ToggleButton
              isOn={value}
              handleToggle={() => setValue(!value)}
              id="active"
              register={register}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
}

export default AddPlayers;

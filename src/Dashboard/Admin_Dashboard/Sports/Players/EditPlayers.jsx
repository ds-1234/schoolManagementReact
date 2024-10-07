import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';

function EditPlayers({ isOpen, onClose, playersId, onSuccess }) {
    const [value, setValue] = useState(true);
  const [playerData, setPlayerData] = useState({});
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [sports, setSports] = useState([]);
  const [selectedSports, setSelectedSports] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    axios.get('http://localhost:8080/user/getUserList')
      .then((response) => {
        const filteredPlayers = response.data.data.filter(user => user.role === 3);
        setPlayers(filteredPlayers);
      })
      .catch((error) => {
        toast.error('Error fetching Players');
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8080/sports/getSportsList')
      .then((response) => {
        // const filteredPlayers = response.data.data.filter(user => user.role.name === 'Student');
        // setPlayers(filteredPlayers);
        setSports(response.data.data)
      })
      .catch((error) => {
        toast.error('Error fetching Sports');
      });
  }, []);

  useEffect(() => {
    if (playersId) {
      axios.get(`http://localhost:8080/players/getPlayersById/${playersId}`)
        .then((response) => {
          const playerData = response.data.data;
          setPlayerData(playerData);
          setSelectedPlayers(playerData.playersName);
          setSelectedSports(playerData.sportsName);
          console.log(selectedPlayers,selectedSports,'selected:')
          setValue(playerData.isActive)
        })
        .catch((error) => {
          console.error('Error fetching player:', error);
        });
    }
  }, [playersId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };



  const handleSportCheckboxChange = (id) => {
    setSelectedSports(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(sportId => sportId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `http://localhost:8080/players/savePlayers`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: playersId,
        ...playerData,
        playersName: selectedPlayers.id,
        sportsName: {id:selectedSports.id},
        isActive: value,
      },
    })
      .then(() => {
        toast.success('Player updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to update Player.');
        console.error('Error updating Player:', error);
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
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Player</h2>

{/* Player Name Input */}
<div className="mb-4 relative">
  <label htmlFor="playersName" className="block text-gray-700 font-semibold mb-2">Player Name</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown for players only
  >
    <p>{selectedPlayers ? `${selectedPlayers.firstName} ${selectedPlayers.lastName}` : 'Select Player'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {dropdownOpen && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      {players.map(player => (
        <div
          key={player.id}
          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          onClick={() => {
            setSelectedPlayers(player); // Set selected player
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
    onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for sports only
  >
    <p>{selectedSports ? selectedSports.sportsName : 'Select Sports'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {dropdownOpen2 && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      {sports.map(sport => (
        <div
          key={sport.id}
          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          onClick={() => {
            setSelectedSports(sport); // Set selected sport
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
              value={playerData.dateOfJoin || ''}
              onChange={handleChange}
              className="block h-11 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3"
            />
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
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

export default EditPlayers;

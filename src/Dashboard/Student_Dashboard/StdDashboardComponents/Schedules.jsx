import React , {useEffect , useState} from 'react'
import BASE_URL from '../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Reusable_components/Button';
import axios from 'axios';
import StdEventCalendar from '../../../Reusable_components/StdEventCalendar';

function Schedules({userTypeImages}) {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

    const [events , setEvents] = useState([])
    const navigate = useNavigate() ;

    const fetchEvents = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/events/getEventList`); // Fetch all events
            // setEvents(response.data.data);
          
            if (response.data.success) {
              // Step 1: Filter events that include role 0
              const eventsWithRole0 = response.data.data.filter(item => 
                item.role.includes(0)
              );
              console.log(eventsWithRole0, 'eventsWithRole0');
              
              // Step 2: Set events that contain role 0
              setEvents(eventsWithRole0);
        
              // Step 3: Filter events that do not contain role 0 based on user.id and className
              const filteredEvents = response.data.data.filter(item => 
                !item.role.includes(0) && 
                (Array.isArray(item.className) && item.className.some(classId => user.className.includes(classId)) || 
                Array.isArray(item.user) && item.user.includes(user.id))
              );
        
              console.log(filteredEvents, 'filteredEvents');
        
              // Merge the two sets of events if you want both to be displayed together
              const allFilteredEvents = [...eventsWithRole0, ...filteredEvents];
              setEvents(allFilteredEvents);
        
            }


        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
    
      useEffect(() => {
        fetchEvents() ;
      } , [])

      const today = new Date();

  return (
    <div className="bg-white flex flex-col p-5 rounded-md mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-blue-950 font-bold">Events</h1>
          <Button label="View More" className="text-sm py-0 px-0" onClick={() => navigate('/studentDashboard/StdEvent')} />
        </div>

        <StdEventCalendar events={events}/>

         {/* Events List */}
  <div className="mt-10">
    <h1 className="text-xl text-black font-semibold mb-5">Upcoming Events</h1>
    {events.length > 0? (
      events.map((event) => (
        <div
          key={event.id}
          className="flex items-start bg-gray-50 shadow-md rounded-lg p-4"
        >

          {/* Event Details */}
          <div className={`flex flex-col w-full pl-4 border-l-2 ${event.isActive ? "border-l-blue-500" : "border-l-red-500" }`}>
            <h2 className="text-lg font-semibold text-gray-800">
              {event.eventTitle}
            </h2>
            <div className="flex justify-between items-center border-b-1 mb-2">
            <p className="text-sm text-gray-500 mt-1 mb-1">
            <i className="fas fa-calendar"></i>  
            {(() => {
              const startDate = new Date(event.startDate);
              const endDate = event.endDate ? new Date(event.endDate) : null;

              if (startDate >= today) {
                // If the event's start date is today or in the future
                return startDate.toLocaleDateString();
              } else if (endDate && endDate >= today) {
                // If the event is ongoing (end date is in the future)
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
              } else {
                // Event is in the past, no need to show
                return null;
              }
            })()}
            </p>
            {console.log(event,'evenrsdsf')}
            <p className="text-sm text-gray-500 mt-1 mb-1">
              <i className="fas fa-clock"></i> {event.startTime} - {event.endTime}
            </p>
            </div>
            <p className="text-sm text-gray-600 mt-2">{event.message}</p>

            {/* Participants (if needed) */}
            <div className="flex mt-3 space-x-2">
              {event.role.map((role, index) => (
                <img
                  key={index}
                  src={userTypeImages[role === 3 ? "Student" : "Teacher"]} // Adjust mapping if needed
                  alt="role"
                  className="w-8 h-8 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No upcoming events.</p>
    )}
  </div>
      </div>
  )
}

export default Schedules
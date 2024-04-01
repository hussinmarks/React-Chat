import React from "react";
import { useState, useEffect } from "react";
import MessageLoader from "./MessageLoader";
import CreateRoom from "./CreateRoom";


const RoomNav = () => {
  const [Rooms, setRooms] = useState([]);
  const [roomCreated, setCreatedRoom] = useState(false);

  const [currentRoom, setCurrentRoom] = useState(null);

  
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await fetch(`http://localhost:8081/room/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
          },
        });

        const json = await response.json();

        console.log(json);
        setRooms(json.Results);
      } catch (err) {
        console.log(err);
      }
    };

    getRooms();
  }, [roomCreated]);

  return (
      <div>
        <CreateRoom setCreatedRoom={setCreatedRoom} />
      <ul style={{ display: "flex", listStyle: "none" }}>
        {Rooms.map((i, idx) => {

          return (
            <li key={idx} className="rooms">
              <button
                onClick={() => {
                  setCurrentRoom(i._id);
                }}
              >
                {i.title}
              </button>
            </li>
          );
        })}
      </ul>
      {currentRoom && <MessageLoader currentRoom={currentRoom} />}
    </div>
  );
};

export default RoomNav;

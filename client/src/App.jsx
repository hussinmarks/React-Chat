import { useState, useEffect } from "react";

import "./App.css";

import { Auth, Room, RoomNav } from "./components/index";

//? App.js - The root component ⭐
function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("MyToken")) {
      setSessionToken(localStorage.getItem("MyToken"));
    }
  }, []);

  const updateToken = (token) => {
    console.log("Token updated");
    localStorage.setItem("MyToken", token);
    setSessionToken(token);
  };

  const clearToken = () => {
    console.log("Token cleared!");
    localStorage.removeItem("MyToken");
    setSessionToken("");
  };

  return (
    <>
      {!sessionToken ? (
        <Auth updateToken={updateToken} />
      ) : (
        <>
          <button onClick={clearToken}>Logout</button>
          <RoomNav />
    
        </>
      )}
    </>
  );
}

export default App;

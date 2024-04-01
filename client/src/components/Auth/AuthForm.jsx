
import React from "react";

const AuthForm = ({ handleChange, handleSignup, handleLogin }) => {
  console.log(handleChange);
  // console.log(handleSignup);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h2>Auth</h2>
        <label>FirstName</label>
        <input onChange={(e) => handleChange("first", e.target.value)} />
        <label>LastName</label>
        <input onChange={(e) => handleChange("last", e.target.value)} />
        <label>Email</label>
        <input onChange={(e) => handleChange("email", e.target.value)} />
        <label>Password</label>
        <input onChange={(e) => handleChange("password", e.target.value)} />

        <button type="button" onClick={handleSignup}>
          Signup
        </button>

        <label>Email</label>
        <input onChange={(e) => handleChange("email", e.target.value)} />
        <label>Password</label>
        <input onChange={(e) => handleChange("password", e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};


export default AuthForm;

import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";

function Auth({ updateToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (state, value) => {
    console.log("are we even hitting this function");
    switch (state) {
      case "first":
        setFirstName(value);
        break;
      case "last":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("something went wrong");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
      ).json();

      updateToken(response.Token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await (
        await fetch("http://localhost:8081/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first: firstName,
            last: lastName,
            email: email,
            password: password,
          }),
        })
      ).json();

      updateToken(response.Token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AuthForm
        handleChange={handleChange}
        handleSignup={handleSignup}
        handleLogin={handleLogin}
      />
    </>
  );
}

export default Auth;
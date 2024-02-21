import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Auth({logOut,setLogOut}) {
    const [signUp, setSignUp] = useState(true);

    const clickHandler = () => {
        setSignUp(!signUp);
        console.log(signUp);
      };
  return (
    <div>
        {
            signUp 
            ? <Login signUp={signUp} setSignUp={setSignUp} clickHandler={clickHandler}/> 
            : <Register signUp={signUp} setSignUp={setSignUp} clickHandler={clickHandler} /> 
        }
    </div>
  );
}

export default Auth;

import React from 'react';
import {
  useNavigate
} from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate('/register');
  };
  
  return (
    <div>
      <button onClick={() => click()}>Test</button> 
      <h1>Home</h1>
    </div>
  );
};

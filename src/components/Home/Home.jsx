import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px', 
  };

  return (
    <>
        <div className='flex justify-center text-xl mt-3 mb-3 bg-slate-400 h-7'>Home</div>

    <div style={divStyle}>

      <Link className='m-3 border-2 p-3' to="/signup">
        <div>Sign Up</div>
      </Link>
      <Link className='m-3 border-2 p-3' to="/login">
        <div>Login</div>
      </Link>
    </div>
    </>
  );
};

export default Home;

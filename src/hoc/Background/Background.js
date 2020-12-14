import React from "react";
import { Link } from "react-router-dom";

const Background = (props) => {
  return (
    <div
      className='bg-image'
      style={{
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        backgroundPosition: "top",
      }}>
      <Link to='/'>
        <img
          src={'/assets/Group2.png'}
          alt='logo'
          style={{
            textAlign: "left",
            width: "10rem",
            height: "auto",
            position: "absolute",
            left: "7rem",
            top: "3rem",
          }}
        />
      </Link>
      {props.children}
    </div>
  );
};

export default Background;

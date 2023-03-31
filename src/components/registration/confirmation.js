import React from "react";

const Confirmation = (props) => {
  const userData = props.getUserData();
  return (
    <div>
      <h2>Confirmation</h2>
      <div>
        <p>{userData.email}</p>
      </div>
      <div>
        <p>{userData.password}</p>
      </div>
      <div>
        <p>{userData.nip}</p>
      </div>
      <div>
        <p>{userData.phoneNumber}</p>
      </div>
      <div>
        <p>{userData.role}</p>
      </div>
      <div>
        <button onClick={props.onCancel}>Return</button>
        <button onClick={props.onSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Confirmation;

import React from "react";

import styles from "./confirmation.module.css";

const Confirmation = (props) => {
  const userData = props.onConfirm();
  return (
    <div className={styles.container}>
      <h2>Confirmation</h2>
      <div>
        <p>Email: {userData.email}</p>
      </div>
      <div>
        <p>Password: {userData.password}</p>
      </div>
      <div>
        <p>NIP: {userData.nip}</p>
      </div>
      <div>
        <p>Phone Number: {userData.phoneNumber}</p>
      </div>
      <div>
        <p>Role: {userData.role}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.return} onClick={props.onCancel}>
          Return
        </button>
        <button className={styles.submit} onClick={props.onSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

import React from "react";

import styles from "./notification.module.css";

const Notification = (props) => {
  const { message, onCancel } = props;
  return (
    <div className={styles.box}>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <button onClick={onCancel}>Okay</button>
      </div>
    </div>
  );
};

export default Notification;

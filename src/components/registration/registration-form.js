import React from "react";

import styles from "./registration-form.module.css";

const RegistrationForm = () => {
  const roles = [
    "Administrator",
    "Dyrektor",
    "Inspektor",
    "Kierownik",
    "Księgowy",
    "Pełnomocnik",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Create an account</h2>
        <form className={styles.form}>
          <div className={styles.control}>
            <input type="email" placeholder="Email address" required />
          </div>
          <div className={styles.control}>
            <input type="password" placeholder="Password" required />
          </div>
          <div className={styles.control}>
            <input type="password" placeholder="Re-enter password" required />
          </div>
          <div className={styles.control}>
            <input type="text" placeholder="NIP" required />
          </div>
          <div className={styles.control}>
            <input type="number" placeholder="Phone number (optional) " />
          </div>
          <div className={styles.control}>
            <select name="role" required value="">
              <option value="" selected disabled hidden>
                Select your role
              </option>
              {roles.map((role) => (
                <option value={role.toLowerCase()} key={role.toLowerCase()}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.actions}>
            <button className={styles.submit}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

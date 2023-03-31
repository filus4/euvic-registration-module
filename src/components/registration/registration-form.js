import React, { useState } from "react";
import Confirmation from "./confirmation";
import Modal from "../UI/modal";

import styles from "./registration-form.module.css";

const roles = [
  "Administrator",
  "Dyrektor",
  "Inspektor",
  "Kierownik",
  "Księgowy",
  "Pełnomocnik",
];

const RegistrationForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [enteredNIP, setEnteredNIP] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select your role");
  const [isConfirming, setIsConfirming] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const confirmHandler = () => {
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      nip: enteredNIP,
      phoneNumber: enteredPhoneNumber || "Not given",
      role: selectedRole,
    };

    return userData;
  };

  const onCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Create an account</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <input
              type="email"
              placeholder="Email address"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <input
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <input
              type="password"
              placeholder="Re-enter password"
              value={reEnteredPassword}
              onChange={(event) => setReEnteredPassword(event.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <input
              type="text"
              placeholder="NIP"
              value={enteredNIP}
              onChange={(event) => setEnteredNIP(event.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <input
              type="number"
              placeholder="Phone number (optional)"
              value={enteredPhoneNumber}
              onChange={(event) => setEnteredPhoneNumber(event.target.value)}
            />
          </div>
          <div className={styles.control}>
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              required
            >
              <option disabled hidden>
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
            <button
              className={styles.submit}
              type="button"
              onClick={() => setIsConfirming(true)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {isConfirming && (
        <Modal>
          <Confirmation
            getUserData={confirmHandler}
            onCancel={onCancel}
            onSubmit={submitHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default RegistrationForm;

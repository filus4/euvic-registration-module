import React, { useState } from "react";
import Confirmation from "./confirmation";
import Modal from "../UI/modal";
import RoleOptions from "../helpers/role-options";
import * as val from "../../validations/registration-validation";

import styles from "./registration-form.module.css";

const RegistrationForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [enteredNIP, setEnteredNIP] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select your role");
  const [isConfirming, setIsConfirming] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [nipError, setNipError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [selectedRoleError, setSelectedRoleError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log();
  };

  const emailBlurHandler = async () => {
    if (!(await val.checkEmail(enteredEmail))) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordBlurHandler = async () => {
    if (!(await val.checkPassword(enteredPassword))) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const rePasswordBlurHandler = async () => {
    if (
      reEnteredPassword !== enteredPassword ||
      !(await val.checkPassword(reEnteredPassword))
    ) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  };

  const nipBlurHandler = () => {
    if (!val.checkNIP(enteredNIP)) {
      setNipError(true);
    } else {
      setNipError(false);
    }
  };

  const phoneNumberBlurHandler = async () => {
    if (
      enteredPhoneNumber !== "" &&
      !(await val.checkPhoneNumber(enteredPhoneNumber))
    ) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };

  const checkValidity = async () => {
    if (!(await val.checkEmail(enteredEmail))) {
      setEmailError(true);
      return false;
    }

    if (!(await val.checkPassword(enteredPassword))) {
      setPasswordError(true);
      return false;
    }

    if (reEnteredPassword !== enteredPassword) {
      setRePasswordError(true);
      return false;
    }

    if (!val.checkNIP(enteredNIP)) {
      setNipError(true);
      return false;
    }

    if (
      !(await val.checkPhoneNumber(enteredPhoneNumber)) &&
      enteredPhoneNumber !== ""
    ) {
      setPhoneNumberError(true);
      return false;
    }

    if (selectedRole === "Select your role") {
      setSelectedRoleError(true);
      return false;
    }
    setIsConfirming(true);
    return true;
  };

  const confirmHandler = () => {
    const okay = checkValidity();
    if (!okay) {
      return;
    }

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      nip: enteredNIP,
      phoneNumber: enteredPhoneNumber || "Not given",
      role: selectedRole,
    };
    return userData;
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Create an account</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div
            className={`${styles.control} ${emailError ? styles.invalid : ""}`}
          >
            <input
              type="email"
              onBlur={emailBlurHandler}
              placeholder="Email address"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.control} ${
              passwordError ? styles.invalid : ""
            }`}
          >
            <input
              type="password"
              onBlur={passwordBlurHandler}
              placeholder="Password"
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.control} ${
              rePasswordError ? styles.invalid : ""
            }`}
          >
            <input
              type="password"
              onBlur={rePasswordBlurHandler}
              placeholder="Re-enter password"
              value={reEnteredPassword}
              onChange={(event) => setReEnteredPassword(event.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.control} ${nipError ? styles.invalid : ""}`}
          >
            <input
              type="text"
              onBlur={nipBlurHandler}
              placeholder="NIP"
              value={enteredNIP}
              onChange={(event) => setEnteredNIP(event.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.control} ${
              phoneNumberError ? styles.invalid : ""
            }`}
          >
            <input
              type="number"
              onBlur={phoneNumberBlurHandler}
              placeholder="Phone number (optional)"
              value={enteredPhoneNumber}
              onChange={(event) => setEnteredPhoneNumber(event.target.value)}
            />
          </div>
          <div
            className={`${styles.control} ${
              selectedRoleError ? styles.invalid : ""
            }`}
          >
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              required
            >
              <RoleOptions />
            </select>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.submit}
              onClick={checkValidity}
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {isConfirming && (
        <Modal onCancel={() => setIsConfirming(false)}>
          <Confirmation
            onConfirm={confirmHandler}
            onCancel={() => setIsConfirming(false)}
            onSubmit={submitHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default RegistrationForm;

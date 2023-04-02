import React, { useState } from "react";
import Confirmation from "./confirmation";
import Modal from "../UI/modal";
import RoleOptions from "../helpers/role-options";
import Notification from "./notification";
import * as val from "../../validations/registration-validation";

import styles from "./registration-form.module.css";
import FormInput from "./form-input";

const RegistrationForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [enteredNIP, setEnteredNIP] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select your role");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [nipError, setNipError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [selectedRoleError, setSelectedRoleError] = useState(false);

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

  const roleBlurHandler = () => {
    if (selectedRole === "Select your role") {
      setSelectedRoleError(true);
    } else {
      setSelectedRoleError(false);
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

  const cancelHandler = () => {
    setIsConfirming(false);
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

  const submitHandler = (event) => {
    event.preventDefault();

    setIsNotification(true);
    setEnteredEmail("");
    setEnteredPassword("");
    setReEnteredPassword("");
    setEnteredNIP("");
    setEnteredPhoneNumber("");
    setSelectedRole("Select your role");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Create an account</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <FormInput
            styles={`${styles.control} ${emailError ? styles.invalid : ""}`}
            type="email"
            onBlur={emailBlurHandler}
            placeholder="Email address"
            value={enteredEmail}
            onChange={(event) => setEnteredEmail(event.target.value)}
            error={emailError}
            errorMessage="Please enter a valid email."
            required
          />
          <FormInput
            styles={`${styles.control} ${passwordError ? styles.invalid : ""}`}
            type="password"
            onBlur={passwordBlurHandler}
            placeholder="Password"
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
            error={passwordError}
            errorMessage="Please entere a valid password."
            required
          />
          <FormInput
            styles={`${styles.control} ${
              rePasswordError ? styles.invalid : ""
            }`}
            type="password"
            onBlur={rePasswordBlurHandler}
            placeholder="Re-enter password"
            value={reEnteredPassword}
            onChange={(event) => setReEnteredPassword(event.target.value)}
            error={rePasswordError}
            errorMessage="Please re-enter your password."
            required
          />
          <FormInput
            styles={`${styles.control} ${nipError ? styles.invalid : ""}`}
            type="text"
            onBlur={nipBlurHandler}
            placeholder="NIP"
            value={enteredNIP}
            onChange={(event) => setEnteredNIP(event.target.value)}
            error={nipError}
            errorMessage="Please enter a valid NIP number."
            required
          />
          <FormInput
            styles={`${styles.control} ${
              phoneNumberError ? styles.invalid : ""
            }`}
            type="number"
            onBlur={phoneNumberBlurHandler}
            placeholder="Phone number (optional)"
            value={enteredPhoneNumber}
            onChange={(event) => setEnteredPhoneNumber(event.target.value)}
            error={phoneNumberError}
            errorMessage="Please enter a valid phone number."
          />
          <div
            className={`${styles.control} ${
              selectedRoleError ? styles.invalid : ""
            }`}
          >
            <select
              value={selectedRole}
              onBlur={roleBlurHandler}
              onChange={(event) => {
                return [
                  setSelectedRole(event.target.value),
                  setSelectedRoleError(false),
                ];
              }}
              required
            >
              <RoleOptions />
            </select>
            {selectedRoleError && <p>Please select your role.</p>}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.submit}
              onClick={confirmHandler}
              type="button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {isConfirming && (
        <Modal onCancel={cancelHandler}>
          {!isNotification && (
            <Confirmation
              onConfirm={confirmHandler}
              onCancel={cancelHandler}
              onSubmit={submitHandler}
            />
          )}
          {isNotification && (
            <Notification
              message={
                "Unfortunately the API is currently unavailable, please try again later."
              }
              onCancel={() => {
                return [setIsNotification(false), cancelHandler()];
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default RegistrationForm;

import React, { Fragment } from "react";

const roles = [
  "Administrator",
  "Dyrektor",
  "Inspektor",
  "Kierownik",
  "Księgowy",
  "Pełnomocnik",
];

const RoleOptions = () => {
  return (
    <Fragment>
      <option disabled hidden>
        Select your role
      </option>
      {roles.map((role) => (
        <option value={role.toLowerCase()} key={role.toLowerCase()}>
          {role}
        </option>
      ))}
    </Fragment>
  );
};

export default RoleOptions;

import * as yup from "yup";
import { validatePolish } from "validate-polish";

const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const passwordSchema = yup.object().shape({
  password: yup.string().required().min(6).max(15),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneSchema = yup.object().shape({
  phoneNumber: yup.string().optional().matches(phoneRegExp),
});

export const checkEmail = async (email) => {
  return emailSchema.isValid({ email });
};

export const checkPassword = async (password) => {
  return passwordSchema.isValid({ password });
};

export const checkNIP = (nip) => {
  return validatePolish.nip(nip);
};

export const checkPhoneNumber = async (phoneNumber) => {
  return phoneSchema.isValid({ phoneNumber });
};

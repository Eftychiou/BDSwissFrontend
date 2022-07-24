import { IRegisterForm } from "../interfaces/IRegisterForm";
export const validateRegistration = (target: IRegisterForm) => {
  const passwordTrimmed = target.password.value.toString().trim();
  const passwordSize = passwordTrimmed.length;
  const containsNumber = /\d/.test(passwordTrimmed);
  const containsLetter = /[a-zA-Z]/.test(passwordTrimmed);
  const fullNameSize = target.fullName.value.trim().length;
  if (
    passwordSize >= 8 &&
    containsNumber &&
    containsLetter &&
    fullNameSize >= 5
  )
    return true;
  return false;
};

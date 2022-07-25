export const validateInput = (
  name: string,
  theInput: any,
  setInputStateShortcut: any
) => {
  if (name === "fullName") {
    const fullNameSize = theInput.value?.trim().length;
    if (fullNameSize >= 5) return setInputStateShortcut(true);
    else return setInputStateShortcut(false);
  }
  if (name === "password") {
    const passwordTrimmed = theInput.value.trim();
    const passwordSize = passwordTrimmed?.length;
    const containsNumber = /\d/.test(passwordTrimmed);
    const containsLetter = /[a-zA-Z]/.test(passwordTrimmed);
    if (passwordSize >= 8 && containsNumber && containsLetter)
      return setInputStateShortcut(true);
    else return setInputStateShortcut(false);
  }
  if (name === "email") {
    const emailTrimmed = theInput.value.trim();
    const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(emailTrimmed);
    if (isEmail) return setInputStateShortcut(true);
    else return setInputStateShortcut(false);
  }
};

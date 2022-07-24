import { InputInterface } from "@/interfaces/InputInterface";
import classes from "@/styles/Input.module.scss";
import { useEffect } from "react";

export default function Input({
  name,
  children,
  type,
  required,
  theInput,
  setInputState,
}: {
  name: string;
  children?: string;
  type: string;
  required?: boolean;
  theInput: InputInterface;
  setInputState: (input: InputInterface) => void;
}) {
  useEffect(() => {
    validateInput();
  }, [theInput?.value]);

  const setInputStateShortcut = (valid: boolean) => {
    // @ts-ignore
    setInputState((prevState) => ({
      ...prevState,
      valid,
    }));
  };

  const validateInput = () => {
    if (name === "fullName") {
      const fullNameSize = theInput?.value?.toString().trim().length;
      if (fullNameSize && fullNameSize >= 5) return setInputStateShortcut(true);
      else return setInputStateShortcut(false);
    }
    if (name === "password") {
      const passwordTrimmed = theInput?.value.toString().trim();
      const passwordSize = passwordTrimmed?.length;
      const containsNumber = /\d/.test(passwordTrimmed || "");
      const containsLetter = /[a-zA-Z]/.test(passwordTrimmed || "");
      if (passwordSize && passwordSize >= 8 && containsNumber && containsLetter)
        return setInputStateShortcut(true);
      else return setInputStateShortcut(false);
    }
    if (name === "email") {
      const emailTrimmed = theInput?.value.toString().trim();
      const emailSize = emailTrimmed?.length;
      if (emailSize && emailSize >= 1) return setInputStateShortcut(true);
      else return setInputStateShortcut(false);
    }
  };

  const classesInput =
    theInput?.value === ""
      ? classes.Input
      : theInput?.valid === true
      ? [classes.Input, classes.valid].join(" ")
      : [classes.Input, classes.invalid].join(" ");

  return (
    <div className={classesInput}>
      <input
        type={type}
        name={name}
        required={required}
        value={theInput?.value || ""}
        onChange={(e) => {
          // @ts-ignore
          setInputState((prevState) => ({
            ...prevState,
            value: e.target.value,
          }));
          validateInput();
        }}
      />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}

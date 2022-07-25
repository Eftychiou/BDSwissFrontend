import { InputInterface } from "@/interfaces/InputInterface";
import classes from "@/styles/Input.module.scss";
import { useEffect } from "react";
import { validateInput } from "../../lib/validation";

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
    validateInput(name, theInput, setInputStateShortcut);
  }, [theInput?.value]);

  const setInputStateShortcut = (valid: boolean) => {
    // @ts-ignore
    setInputState((prevState) => ({
      ...prevState,
      valid,
    }));
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
          validateInput(name, theInput, setInputStateShortcut);
        }}
      />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}

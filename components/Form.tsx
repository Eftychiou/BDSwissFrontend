import { useState } from "react";
import axios from "axios";

import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { InputInterface } from "@/interfaces/InputInterface";
import classes from "@/styles/Form.module.scss";

const serverUrl = "http://localhost:4000";

export default function Form(props: {
  showForm: boolean;
  formType: string;
  setNotification: Function;
  showOptionsHideForm: () => void;
  showNotification: (message: string, delay?: number) => void;
  setShowOptions: (x: boolean) => void;
  setShowForm: (x: boolean) => void;
}) {
  const {
    showForm, formType, setNotification, showNotification,
    showOptionsHideForm, setShowOptions, setShowForm,
  } = props;
  const [fullName, setFullName] = useState({ value: "", valid: false } as InputInterface);
  const [password, setPassword] = useState({ value: "", valid: false } as InputInterface);
  const [email, setEmail] = useState({ value: "", valid: false } as InputInterface) ;

  const submit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    if (formType === "Register") register();
    else if (formType === "Login") login();
  };

  const login = () => {
    const data = { email: email.value, password: password.value };
    axios
      .post(`${serverUrl}/login`, data)
      .then(({ data }) => {
        setNotification({
          message: `Welcome ${data.fullName}! To logout click `,
          link: window.location.href,
        });
      })
      .catch((err) => showNotification(err.response.data.message))
      .finally(() => resetInputs());
  };

  const register = () => {
    const data = {email: email.value,password: password.value,fullName: fullName.value};
    axios
      .post(`${serverUrl}/register`, data)
      .then(({ data }: { data: { message: string } }) => {
        showNotification(data.message);
        setShowOptions(true);
        setShowForm(false);
      })
      .catch((err) => showNotification(err.response.data.message))
      .finally(() => resetInputs());
  };
  const resetInputs = () => {
    setEmail({ value: "", valid: false });
    setFullName({ value: "", valid: false });
    setPassword({ value: "", valid: false });
  };

  if (!showForm) return null;
  return (
    <div className={classes.Form}>
      <form onSubmit={submit}>
        <span className={classes.textCenter}>{formType}</span>
        {formType === "Register" && (
          <Input
            type='text'
            name='fullName'
            required
            theInput={fullName}
            setInputState={setFullName}>
            Full Name
          </Input>
        )}
        <Input
          type='text'
          name='email'
          required
          theInput={email}
          setInputState={setEmail}>
          Email
        </Input>
        <Input
          type='password'
          name='password'
          required
          theInput={password}
          setInputState={setPassword}>
          Password
        </Input>
        <div className={classes.center}>
          <Button type='submit'>Submit</Button>
          <Button onclick={showOptionsHideForm}>Back</Button>
        </div>
      </form>
    </div>
  );
}

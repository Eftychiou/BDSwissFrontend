import { BaseSyntheticEvent, useState } from "react";
import axios from "axios";

import classes from "@/styles/Home.module.scss";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { validateRegistration } from "../lib/validation";
import { IRegisterForm } from "@/interfaces/IRegisterForm";
import { ILoginForm } from "@/interfaces/ILoginForm";
import Notification from "@/components/shared/Notification";
import { INotification } from "@/interfaces/INotification";
import { Messages } from "@/interfaces/Messages";
const serverUrl = "http://localhost:4000";

export default function HomePage() {
  const [showOptions, setShowOptions] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [notification, setNotification] = useState(
    null as INotification | null
  );

  const submit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (formType === "Register") register(event);
    else if (formType === "Login") login(event);
  };

  const login = ({ target }: { target: ILoginForm }) => {
    const data = { email: target.email.value, password: target.password.value };
    axios
      .post(`${serverUrl}/login`, data)
      .then(({ data }) => {
        setNotification({
          message: `Welcome ${data.fullName}! To logout click `,
          link: window.location.href,
        });
      })
      .catch((err) => showNotification(err.response.data.message))
      .finally(() => target.reset());
  };

  const register = ({ target }: { target: IRegisterForm }) => {
    if (!validateRegistration(target))
      return showNotification(Messages.REGISTER_REQUIREMENTS, 10000);
    const data = {
      email: target.email.value,
      password: target.password.value,
      fullName: target.fullName.value,
    };
    axios
      .post(`${serverUrl}/register`, data)
      .then(({ data }: { data: { message: string } }) => {
        showNotification(data.message);
        setShowOptions(true);
        setShowForm(false);
      })
      .catch((err) => showNotification(err.response.data.message))
      .finally(() => target.reset());
  };

  const showNotification = (message: string, delay?: number | undefined) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), delay || 3000);
  };
  const hideOptionsShowForm = (formType: string) => {
    setShowOptions(false);
    setShowForm(true);
    setFormType(formType);
  };
  const showOptionsHideForm = () => {
    setShowOptions(true);
    setShowForm(false);
    setNotification(null);
  };

  return (
    <div className={classes.Homepage}>
      {showOptions && (
        <div className={classes.container}>
          <Button onclick={() => hideOptionsShowForm("Register")}>
            Register
          </Button>
          <Button onclick={() => hideOptionsShowForm("Login")}>Login</Button>
        </div>
      )}
      {showForm && (
        <div className={classes.box}>
          <form onSubmit={submit}>
            <span className={classes.textCenter}>{formType}</span>
            {formType === "Register" && (
              <Input type='text' name='fullName' required>
                Full Name
              </Input>
            )}
            <Input type='email' name='email' required>
              Email
            </Input>
            <Input type='password' name='password' required>
              Password
            </Input>
            <div className={classes.center}>
              <Button type='submit'>Submit</Button>
              <Button onclick={showOptionsHideForm}>Back</Button>
            </div>
          </form>
        </div>
      )}
      <Notification
        notification={notification}
        showOptionsHideForm={showOptionsHideForm}
      />
    </div>
  );
}

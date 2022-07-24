import { useState } from "react";

import Options from "@/components/Options";
import Form from "@/components/Form";
import Notification from "@/components/shared/Notification";
import { INotification } from "@/interfaces/INotification";
import classes from "@/styles/Home.module.scss";

export default function HomePage() {
  const [showOptions, setShowOptions] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [notification, setNotification] = useState(
    null as INotification | null
  );

  const showNotification = (message: string, delay?: number) => {
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
      <Options
        hideOptionsShowForm={hideOptionsShowForm}
        showOptions={showOptions}
      />
      <Form
        showForm={showForm}
        formType={formType}
        showOptionsHideForm={showOptionsHideForm}
        setNotification={setNotification}
        showNotification={showNotification}
        setShowOptions={setShowOptions}
        setShowForm={setShowForm}
      />
      <Notification
        notification={notification}
        showOptionsHideForm={showOptionsHideForm}
      />
    </div>
  );
}

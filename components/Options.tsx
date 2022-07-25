import Button from "@/components/shared/Button";
import classes from "@/styles/Options.module.scss";

export default function Options(props: {
  showOptions: boolean;
  hideOptionsShowForm: (formType: string) => void;
}) {
  const { hideOptionsShowForm, showOptions } = props;
  if (!showOptions) return null;
  return (
    <div className={classes.Options}>
      <Button
        testId='registerBtn'
        onclick={() => hideOptionsShowForm("Register")}>
        Register
      </Button>
      <Button testId='loginBtn' onclick={() => hideOptionsShowForm("Login")}>
        Login
      </Button>
    </div>
  );
}

import classes from "@/styles//Button.module.scss";
export default function Button({
  children,
  onclick,
  type = "button",
  testId,
}: {
  children?: string;
  onclick?: any;
  type?: any;
  testId?: string;
}) {
  return (
    <button
      type={type}
      onClick={onclick}
      className={classes.Button}
      data-testid={testId}>
      {children}
    </button>
  );
}

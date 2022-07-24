import classes from "@/styles//Button.module.scss";
export default function Button({
  children,
  onclick,
  type = "button",
}: {
  children?: string;
  onclick?: any;
  type?: any;
}) {
  return (
    <button type={type} onClick={onclick} className={classes.Button}>
      {children}
    </button>
  );
}

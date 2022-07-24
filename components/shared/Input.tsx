import classes from "@/styles/Input.module.scss";

export default function Input({
  name,
  children,
  type,
  required,
}: {
  name: string;
  children?: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className={classes.Input}>
      <input type={type} name={name} required={required} />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}

import classes from "@/styles/Notification.module.scss";
import { INotification } from "@/interfaces/INotification";

export default function Notification(props: {
  notification: INotification | null;
  showOptionsHideForm: Function;
}) {
  if (!props.notification) return null;
  const { message = null, link = null } = props.notification;
  if (message)
    return (
      <div className={classes.Notification}>
        {message}
        {link && (
          <a
            style={{ color: "blue" }}
            href={link as string}
            onClick={
              props.showOptionsHideForm as React.MouseEventHandler<HTMLAnchorElement>
            }>
            {"===>"}
            here
          </a>
        )}
      </div>
    );
  else return null;
}

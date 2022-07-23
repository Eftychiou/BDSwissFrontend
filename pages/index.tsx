import classes from "@/styles/Home.module.scss";
import Button from "@/components/shared/Button";
export default function HomePage() {
  return (
    <div className={classes.Homepage}>
      <Button>Register</Button>
      <Button>Login</Button>
    </div>
    // <form className={classes.Homepage} action=''>
    //   <label htmlFor='fullName'>Full Name</label>
    //   <input type='text' name='fullName' id='fullName' />
    // </form>
  );
}

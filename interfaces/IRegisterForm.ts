export interface IRegisterForm {
  password: { value: string | number };
  fullName: { value: string };
  email: { value: string };
  reset: Function;
}

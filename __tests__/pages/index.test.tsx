import {
  render,
  screen,
  fireEvent,
  cleanup,
  getByText,
} from "@testing-library/react";
import Homepage from "@/pages/index";
import Button from "@/components/shared/Button";
import { validateInput } from "../../lib/validation";
import Form from "@/components/Form";
import Notifications from "@/components/shared/Notification";

afterEach(() => cleanup());
describe("Homepage Buttons", () => {
  it("Login Button calls hideOptionsShowForm", () => {
    const hideOptionsShowForm = jest.fn();
    const { getByTestId } = render(
      <Button onclick={hideOptionsShowForm} testId={"loginBtn"} />
    );
    fireEvent.click(getByTestId("loginBtn"));
    expect(hideOptionsShowForm).toHaveBeenCalled;
  });
});

describe("Homepage Inputs", () => {
  it("validateInput check if fullName is at least 5 characters", () => {
    const name = "fullName";
    const theInput = { value: "George", valid: false };
    const setInputStateShortcut = (state: boolean) => {
      theInput.valid = state;
    };
    validateInput(name, theInput, setInputStateShortcut);
    if (theInput.valid) return;
    else throw "validateInput doesn't work";
  });
});
describe("Homepage Inputs", () => {
  it("validateInput check if password includes at least 1 letter and 1 number and it's total of 8 characters", () => {
    const name = "password";
    const theInput = { value: "thisIsThePassword1", valid: false };
    const setInputStateShortcut = (state: boolean) => {
      theInput.valid = state;
    };
    validateInput(name, theInput, setInputStateShortcut);
    if (theInput.valid) return;
    else throw "validateInput doesn't work";
  });
});
describe("Homepage Form", () => {
  it("Login form is submited when Submit Button is pressed", () => {
    const axiosRequest = jest.fn();
    const dummyCallback = () => {};
    const { container } = render(
      <Form
        showForm={true}
        formType='Login'
        setNotification={dummyCallback}
        setShowForm={dummyCallback}
        setShowOptions={dummyCallback}
        showNotification={dummyCallback}
        showOptionsHideForm={dummyCallback}
      />
    );
    let theForm = container.querySelector("form");
    theForm?.addEventListener("submit", axiosRequest);

    fireEvent.click(screen.getByText("Submit"));
    expect(axiosRequest).toHaveBeenCalled;
  });
});

describe("Homepage Notifications", () => {
  it("Notification is shown with a message and a link on HERE when passed a notification prop", () => {
    const showOptionsHideForm = () => {};
    const link = "www.google.com";
    const message = "Welcome";
    const notification = { message, link };
    const { getByText } = render(
      <Notifications
        showOptionsHideForm={showOptionsHideForm}
        notification={notification}
      />
    );
    expect(getByText(message)).toBeInTheDocument;
    expect(screen.getByText("HERE")).toHaveAttribute("href", link);
  });
});

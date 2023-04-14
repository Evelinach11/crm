import { useState } from "react";
import { setUser } from "store/slices/userSlice";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentification } from "../../firebase";
import { Button, Form } from "react-bootstrap";

export const NumberAuth = ({ dispatch, navigate }) => {
  const countryCode = "+38";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [form, setForm] = useState(false);
  const [code, setCode] = useState("");

  const generateRecaptcha = () => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentification
    );
  };

  const requestCode = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setForm(true);
      generateRecaptcha();
      let appVerifier = window.RecaptchaVerifier;
      signInWithPhoneNumber(authentification, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          alert("Invalid number");
        });
    }
  };

  const verifyCode = (e) => {
    let code = e.target.value;
    setCode(code);

    if (code.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );
          navigate("/");
        })
        .catch((error) => {
          alert("Invalid code");
        });
    }
  };

  return (
    <div>
      <Form onSubmit={requestCode}>
        <Form.Group>
          <Form.Control
            required
            className="mt-2"
            type="tel"
            id="phoneNumberInput"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {form === true ? (
          <Form>
            <Form.Label htmlFor="otpInput">Code for authorization</Form.Label>

            <Form.Group>
              <Form.Control
                required
                className="mt-2"
                type="number"
                id="otpInput"
                value={code}
                onChange={verifyCode}
              ></Form.Control>
            </Form.Group>
          </Form>
        ) : null}
        {form === false ? (
          <Button type="submit" variant="dark" className="mt-2">
            Send code
          </Button>
        ) : null}
        <div id="recaptcha-container"></div>
      </Form>
    </div>
  );
};

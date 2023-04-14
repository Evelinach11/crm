import { MailForm } from "./MailForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "store/slices/userSlice";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import userDataServices from "../services/user.services";

const SignUp = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function submitForm() {
  //   let selectElement = document.getElementById("roleSelect");
  //   let selectedValue = selectElement.value;
  //   setRole(selectedValue);
  // }

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            role: user.role,
          })
        );
        userDataServices.addUser({
          name: user.email,
          email: user.email,
          role: "role",
        });
        navigate("/login");
      })
      .catch(console.error);
  };
  return (
    <Container>
      <Form.Control
        className="mt-2"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="name"
        placeholder="name"
      />
      <Form.Select aria-label="Default select example" id="roleSelect">
        <option>Select role</option>
        <option value="passenger">Passenger</option>
        <option value="driver">Driver</option>
      </Form.Select>

      <MailForm title="Register" handleClick={handleRegister} />
    </Container>
  );
};

export default SignUp;

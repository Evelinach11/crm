import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "components/SignUp";

const RegisterPage = () => {
  return (
    <Container>
      <h1>Register</h1>
      <SignUp />
      <p>
        Already have an account <Link to="/login">Sign in</Link>
      </p>
    </Container>
  );
};

export default RegisterPage;

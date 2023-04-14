import { Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MailAuth } from "../components/auths/MailAuth";
import { GoogleAuth } from "../components/auths/GoogleAuth";
import { FacebookAuth } from "../components/auths/FacebookAuth";
import { NumberAuth } from "../components/auths/NumberAuth";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container className="mt-2">
      <Form>
        <Form>
          <h2 className="text-uppercase">Login</h2>
          <MailAuth dispatch={dispatch} navigate={navigate} />
          <p className="mt-3">
            If you do not have email try to login with phone number
          </p>
          <NumberAuth dispatch={dispatch} navigate={navigate} />

          <ButtonGroup className="mt-2" aria-label="Basic example">
            <GoogleAuth dispatch={dispatch} navigate={navigate} />
            <p className="m-1">or</p>
            <FacebookAuth dispatch={dispatch} navigate={navigate} />
          </ButtonGroup>
          <p>
            Or <Link to="/register">Register</Link>
          </p>
        </Form>
      </Form>
    </Container>
  );
};

export default LoginPage;

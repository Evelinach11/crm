import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const MailForm = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          className="mt-2"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="email"
          required
        />
        <Form.Control
          className="mt-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="password"
          required
        />
      </Form.Group>
      <Button
        className="mt-2"
        variant="danger"
        onClick={() => handleClick(email, password)}
      >
        {title}
      </Button>
    </Form>
  );
};

export { MailForm };

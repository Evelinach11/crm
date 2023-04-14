import { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import userDataServices from "../services/user.services";

export const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await userDataServices.getUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function updateUserRole(userId) {
    let selectElement = document.getElementById("roleSelect" + userId);
    let selectedValue = selectElement.value;

    userDataServices.updateUser(userId, selectedValue);
  }

  return (
    <Container>
      <div>
        <img
          src="'../../img/menu-bar.png"
          onClick={getUsers}
          className="icon"
        ></img>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((doc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>
                <Form.Select
                  aria-label="Default select example"
                  id={"roleSelect" + doc.id}
                >
                  <option>Select role</option>
                  <option id={1} value="passenger">
                    Passenger
                  </option>
                  <option id={2} value="driver">
                    Driver
                  </option>
                  <option id={3} value="dispetcher">
                    Dispetcher
                  </option>
                  <option id={4} value="admin">
                    Admin
                  </option>
                </Form.Select>
                <Button
                  variant="dark"
                  onClick={() => {
                    updateUserRole(doc.id);
                  }}
                >
                  Submit
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    userDataServices.deleteUser(doc.id);
                    setUsers(users.filter((item) => item.id !== doc.id));
                  }}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

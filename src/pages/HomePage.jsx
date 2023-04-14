import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/use-auth";
import { removeUser } from "store/slices/userSlice";
import { Button, Container, Image } from "react-bootstrap";
import userDataServices from "../services/user.services";
import TripDataService from "services/trip.services";
import { useState, useEffect } from "react";
import { AdminPage } from "./AdminPage";
import PassengerPage from "./PassengerPage";
import { DriverPage } from "./DriverPage";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const [currentRole, setCurrentRole] = useState("");
  const [isRoleFetched, setIsRoleFetched] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);

  let content;

  useEffect(() => {
    const getRole = async () => {
      const role = await userDataServices.getRoleByEmail(email);

      if (!isRoleFetched) {
        setCurrentRole(role);
        setIsRoleFetched(true);
      }
    };

    getRole();
  }, []);

  const getDrivers = async () => {
    const users = await userDataServices.getUsersByRole("driver");

    if (drivers.length == 0) {
      setDrivers(users);
    }
  };

  const getTrips = async () => {
    const data = await TripDataService.getTrips();
    if (trips.length == 0) {
      setTrips(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  function showContent() {
    getDrivers();
    getTrips();
    switch (currentRole) {
      case "admin":
        content = <AdminPage />;
        break;
      case "passenger":
        content = <PassengerPage drivers={drivers} tripData={trips} />;
        break;
      case "driver":
        content = <DriverPage tripData={trips} />;
        break;
      default:
        content = <PassengerPage drivers={drivers} tripData={trips} />;
    }
  }
  showContent();

  return isAuth ? (
    <Container>
      <div></div>
      <Container>
        <Row>
          <Col sm={8}>
            <h3>Welcome {email}</h3>
          </Col>
          <Col sm={3}>
            <h1></h1>
          </Col>

          <Col>
            <Button
              className="mt-2"
              onClick={() => dispatch(removeUser())}
              variant="dark"
            >
              Log out
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <p>You are {currentRole}</p>
      </Container>

      <Container>{content}</Container>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;

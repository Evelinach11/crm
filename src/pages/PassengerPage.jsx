import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { TripInfosPage } from "./TripInfosPage";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import tripServices from "services/trip.services";

const PassengerPage = ({ drivers, tripData }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (trips.length == 0) {
      setTrips(tripData);
    }
  });

  const fromCitySelect = document.getElementById("roleSelectFrom");
  const toCitySelect = document.getElementById("roleSelectTo");
  const driverSelect = document.getElementById("roleSelectDriver");
  const nameInput = document.querySelector('input[type="name"]');
  const numberInput = document.querySelector('input[type="number"]');

  function getFormData() {
    const formData = {
      driverName: driverSelect.options[driverSelect.selectedIndex].value,
      fromCity: fromCitySelect.options[fromCitySelect.selectedIndex].value,
      passengerName: nameInput.value,
      passengerNumber: numberInput.value,
      toCity: toCitySelect.options[toCitySelect.selectedIndex].value,
    };

    tripServices.addTrip(formData);

    setTrips((prevTrips) => [...prevTrips, formData]);
    alert("Created new trip");
  }

  return (
    <Container>
      <Form>
        <h1>Create trip</h1>
        <ButtonGroup className="m-2" aria-label="Basic example">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>with sity</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="roleSelectFrom"
            >
              <option>sity</option>
              <option value="Lviv">Lviv</option>
              <option value="Kyiv">Kyiv</option>
              <option value="Chernivtsi">Chernivtsi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>to sity</Form.Label>
            <Form.Select aria-label="Default select example" id="roleSelectTo">
              <option>sity</option>
              <option value="Lviv">Lviv</option>
              <option value="Kyiv">Kyiv</option>
              <option value="Chernivtsi">Chernivtsi</option>
            </Form.Select>
          </Form.Group>
        </ButtonGroup>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Control type="name" placeholder="Name" required />
          <Form.Control type="number" placeholder="Number" required />
          <Form.Select
            aria-label="Default select example"
            id="roleSelectDriver"
          >
            <option>Choose driver</option>

            {drivers.map((driver) => (
              <option key={driver.id}>{driver.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button
        onClick={() => {
          getFormData();
        }}
        className="mb-3"
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      <TripInfosPage trips={trips} />
    </Container>
  );
};

export default PassengerPage;

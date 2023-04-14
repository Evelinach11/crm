import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

export const TripInfosPage = ({ trips }) => {
  return (
    <Container>
      <h1>All trips</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>fromCity</th>
            <th>toCity</th>
            <th>driverName</th>
            <th>passengerName</th>
            <th>passengerNumber</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.index}>
              <th>{trip.fromCity}</th>
              <th>{trip.toCity}</th>
              <th>{trip.driverName}</th>
              <th>{trip.passengerName}</th>
              <th>{trip.passengerNumber}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

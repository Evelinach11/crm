import { TripInfosPage } from "./TripInfosPage";

export const DriverPage = ({ tripData }) => {
  return (
    <div>
      <TripInfosPage trips={tripData} />
    </div>
  );
};

import { db } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const tripCollectionRef = collection(db, "trips");
class TripDataService {
  addTrip = (newTrip) => {
    return addDoc(tripCollectionRef, newTrip);
  };

  deleteTrip = (id) => {
    const tripDoc = doc(db, "trips", id);
    return deleteDoc(tripDoc);
  };

  getTrips = () => {
    return getDocs(tripCollectionRef);
  };
}

export default new TripDataService();

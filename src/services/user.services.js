import { db } from "../firebase";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");
class UserDataService {
  addUser = (newUser) => {
    return addDoc(usersCollectionRef, newUser);
  };

  updateUser = (id, newRole) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, "role", newRole);
  };

  deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  getUsers = () => {
    return getDocs(usersCollectionRef);
  };

  getRoleByEmail = async (email) => {
    const q = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let role;
    querySnapshot.forEach((doc) => {
      role = doc.data().role;
    });

    return role;
  };

  getUsersByRole = async (role) => {
    const q = query(usersCollectionRef, where("role", "==", role));
    const querySnapshot = await getDocs(q);
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  };
}

export default new UserDataService();

import { database } from "@/firebase";
import { Client } from "@/types";
import { collection, addDoc } from "firebase/firestore";

export const newClient = async (client: Client) => {
  const clientsRef = collection(database, "clients");
  await addDoc(clientsRef, client);
};
import { database } from "@/firebase";
import { Application } from "@/types";
import { collection, addDoc } from "firebase/firestore";

export const newApplication = async (application: Application) => {
  const applicationsRef = collection(database, "applications");
  await addDoc(applicationsRef, application);
};
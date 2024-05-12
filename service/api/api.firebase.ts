import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getCollections(table: string) {
  const querySnapshot = await getDocs(collection(db, table));
  const result = [];
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  return result;
}

export async function getDocument(table: string, id: string) {
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

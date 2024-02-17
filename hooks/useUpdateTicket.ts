import 'react-native-get-random-values';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebaseApp from './firebaseApp';

const db = getFirestore(firebaseApp);

interface FieldsToUpdate {
  status: 'new' | 'in-progress' | 'resolved';
  response: string;
}

const updateTicket = async (id: string, fieldsToUpdate: FieldsToUpdate) => {
  const ticketRef = doc(db, 'tickets', id);
  return setDoc(ticketRef, fieldsToUpdate, { merge: true });
};

const useUpdateTicket = () => {
  return updateTicket;
};

export default useUpdateTicket;

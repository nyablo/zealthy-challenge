import 'react-native-get-random-values';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import firebaseApp from './firebaseApp';

const db = getFirestore(firebaseApp);
const ticketsCollectionRef = collection(db, 'tickets');

interface TicketInputDescriptor {
  name: string;
  email: string;
  description: string;
  attachments: string[];
}

const createTicket = async (ticketInput: TicketInputDescriptor) => {
  return addDoc(ticketsCollectionRef, { ...ticketInput, status: 'new' });
};

const useCreateTickets = () => {
  return createTicket;
};

export default useCreateTickets;

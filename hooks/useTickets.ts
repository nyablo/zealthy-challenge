import 'react-native-get-random-values';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import firebaseApp from './firebaseApp';

const db = getFirestore(firebaseApp);
const ticketsCollectionRef = collection(db, 'tickets');

export interface Ticket {
  id: string;
  name: string;
  email: string;
  description: string;
  response?: string;
  attachments: string[];
  status: 'new' | 'in-progress' | 'resolved';
}

const useTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);

  const refetch = () => {
    setLoading(true);
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(ticketsCollectionRef);
      const res: Ticket[] = [];
      querySnapshot.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id } as Ticket);
      });
      setTickets(res);
      setLoading(false);
    } catch (error) {
      setError(`Unable to load tickets: ${(error as Error).message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { tickets, error, isLoading, refetch };
};

export default useTickets;

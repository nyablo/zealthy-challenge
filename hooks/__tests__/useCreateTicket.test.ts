import { act, renderHook } from '@testing-library/react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import useCreateTickets from '../useCreateTicket';

jest.mock('../firebaseApp', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  getFirestore: jest.fn(),
  collection: jest.fn().mockReturnValue('ticketsCollectionRef'),
  addDoc: jest.fn(),
}));

describe('useCreateTickets', () => {
  const ticketInput = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    description: 'This is a test ticket',
    attachments: ['attachment1.jpg', 'attachment2.jpg'],
  };

  it('should create a new ticket', async () => {
    const addDocMock = jest.fn();
    (addDoc as jest.Mock).mockReturnValueOnce(addDocMock);

    const { result } = renderHook(() => useCreateTickets());

    await act(async () => {
      await result.current(ticketInput);
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      ...ticketInput,
      status: 'new',
    });
    // expect(addDocMock).toHaveBeenCalledTimes(1);
  });
});

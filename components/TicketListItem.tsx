import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import type { Ticket } from '@/hooks/useTickets';

interface Props {
  ticket: Ticket;
}

const TicketListItem: React.FC<Props> = ({ ticket }) => {
  const { name, email, status } = ticket;
  const router = useRouter();

  const navigateToTicketDetails = () => {
    router.push({ pathname: '/ticketDetails', params: { ticket: JSON.stringify(ticket) } });
  };

  return (
    <TouchableRipple onPress={navigateToTicketDetails} style={styles.wrapper}>
      <>
        <View style={styles.leftContent}>
          <Text ellipsizeMode="tail" style={styles.name}>
            {name}
          </Text>
          <Text ellipsizeMode="tail">{email}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={[styles.status]}>{status}</Text>
        </View>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'center',
  },
  rightContent: {
    flex: 0,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
});

TicketListItem.displayName = 'TicketListItem';

export default TicketListItem;

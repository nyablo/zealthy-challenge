/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import TicketListItem from '@/components/TicketListItem';
import useTickets from '@/hooks/useTickets';

export default function AdminPanel() {
  const { tickets, isLoading, error, refetch } = useTickets();

  if (isLoading) {
    return <ActivityIndicator style={styles.activityIndicator} animating />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      data={tickets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TicketListItem ticket={item} />}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 16,
  },
  errorText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

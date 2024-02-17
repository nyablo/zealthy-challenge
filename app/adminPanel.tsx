/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

import TicketListItem from '@/components/TicketListItem';
import useTickets from '@/hooks/useTickets';

export default function AdminPanel() {
  const theme = useTheme();
  const { tickets, isLoading, error, refetch } = useTickets();

  if (isLoading) {
    return <ActivityIndicator style={styles.activityIndicator} animating />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (tickets.length === 0) {
    return <Text style={styles.errorText}>No tickets yet</Text>;
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.colors.background }}
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

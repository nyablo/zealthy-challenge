import { Link } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function MyTickets() {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Link href="/createTicketModal" asChild>
        <Button mode="contained">Submit Ticket</Button>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
});

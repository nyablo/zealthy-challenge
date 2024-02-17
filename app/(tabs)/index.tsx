import { Link } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export default function NewTicket() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

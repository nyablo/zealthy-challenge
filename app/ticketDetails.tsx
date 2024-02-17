/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, Divider, Text, TextInput } from 'react-native-paper';

import ImagesGrid from '@/components/ImagesGrid';
import { Ticket } from '@/hooks/useTickets';
import useUpdateTicket from '@/hooks/useUpdateTicket';

export default function TicketDetails() {
  const router = useRouter();
  const updateTicket = useUpdateTicket();
  const { ticket } = useLocalSearchParams();
  const {
    id,
    attachments,
    name,
    email,
    description,
    response: responseStored,
    status: statusStored,
  } = JSON.parse(ticket as string) as Ticket;
  const [isSubmitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(responseStored ?? '');
  const [status, setStatus] = useState<'new' | 'in-progress' | 'resolved'>(statusStored);

  const openImage = (uri: string, index: number) => {
    console.log('Open image', uri, index);
  };

  const saveChanges = async () => {
    setSubmitting(true);
    try {
      await updateTicket(id, { response, status });
      Alert.alert('Ticket updated');
      router.back();
    } catch (error) {
      Alert.alert('Failed to update ticket', (error as Error).message);
      console.error('Error updating ticket:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="labelLarge">Name:</Text>
      <Text variant="bodyLarge">{name}</Text>
      <Divider style={styles.divider} />

      <Text variant="labelLarge">Email:</Text>
      <Text variant="bodyLarge">{email}</Text>
      <Divider style={styles.divider} />

      <Text variant="labelLarge">Description:</Text>
      <Text variant="bodyLarge">{description}</Text>
      <Divider style={styles.divider} />

      <Text variant="labelLarge">Attachments:</Text>
      <ImagesGrid uris={attachments} onPress={openImage} />

      <Divider style={styles.divider} />
      <Text variant="labelLarge">Response:</Text>
      <TextInput
        mode="outlined"
        accessibilityRole="text"
        accessibilityLabel="Description input field"
        accessibilityHint="Enter description of the issue"
        placeholder="Doctor's comment..."
        onChangeText={setResponse}
        defaultValue={response}
        maxLength={500}
        multiline
        numberOfLines={5}
        lineBreakStrategyIOS="push-out"
        style={styles.textInput}
      />
      <Divider style={styles.divider} />
      <Text variant="labelLarge">Status:</Text>
      <View>
        <Checkbox.Item
          label="New"
          status={status === 'new' ? 'checked' : 'unchecked'}
          onPress={() => setStatus('new')}
        />
        <Checkbox.Item
          label="In Progress"
          status={status === 'in-progress' ? 'checked' : 'unchecked'}
          onPress={() => setStatus('in-progress')}
        />
        <Checkbox.Item
          label="Resolved"
          status={status === 'resolved' ? 'checked' : 'unchecked'}
          onPress={() => setStatus('resolved')}
        />
      </View>
      <Divider style={styles.divider} />
      <Button
        disabled={isSubmitting}
        onPress={saveChanges}
        mode="contained"
        style={{ marginTop: 8 }}>
        {isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  divider: {
    marginVertical: 8,
  },
  textInput: { height: 120, marginTop: 8 },
});

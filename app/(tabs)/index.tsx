import type { ImagePickerAsset } from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

import ImagePickerComponent from '@/components/ImagePicker';
import useCreateTickets from '@/hooks/useCreateTicket';
import useUploadFiles, { FileDescriptor } from '@/hooks/useUploadFiles';
import { Link } from 'expo-router';

interface FieldValues {
  name: string;
  email: string;
  description: string;
}

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
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
  },
});

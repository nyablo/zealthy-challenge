import type { ImagePickerAsset } from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, ScrollView, View, Alert, Platform } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

import ImagePickerComponent from '@/components/ImagePicker';
import useCreateTickets from '@/hooks/useCreateTicket';
import useUploadFiles, { FileDescriptor } from '@/hooks/useUploadFiles';

interface FieldValues {
  name: string;
  email: string;
  description: string;
}

export default function CreateTicketModal() {
  const router = useRouter();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);
  const uploadFiles = useUploadFiles();
  const createTicket = useCreateTickets();

  const submitForm = async (data: FieldValues) => {
    // upload images to server and get URLs
    let fileRefs;
    try {
      fileRefs = await uploadFiles(selectedImages as FileDescriptor[]);
    } catch (error) {
      Alert.alert('Failed to upload images');
      console.debug('Error uploading images:', error);
      return;
    }

    // then submit the form data along with the image URLs
    try {
      await createTicket({ ...data, attachments: fileRefs });
      Alert.alert('Ticket submitted');
      router.back();
    } catch (error) {
      console.debug('Error submitting form:', error);
      Alert.alert('Failed to submit form');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'Name is required' },
          maxLength: { value: 100, message: 'Name is too long' },
          minLength: { value: 2, message: 'Name is too short' },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              accessibilityRole="text"
              accessibilityLabel="Name input field"
              accessibilityHint="Enter your name"
              label="Name"
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.name?.message as string}
              </Text>
            )}
          </View>
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'Email is required' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email is invalid',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              accessibilityRole="text"
              accessibilityLabel="Email input field"
              accessibilityHint="Enter your email address"
              label="Email"
              onChangeText={onChange}
              value={value}
              maxLength={100}
              error={!!errors.email}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.email?.message as string}
              </Text>
            )}
          </View>
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'Description is required' },
          minLength: { value: 10, message: 'Must be at least 10 chars long' },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              accessibilityRole="text"
              accessibilityLabel="Description input field"
              accessibilityHint="Enter description of the issue"
              label="Description"
              onChangeText={onChange}
              value={value}
              error={!!errors.description}
              maxLength={100}
              lineBreakStrategyIOS="push-out"
            />
            {errors.description && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.description?.message as string}
              </Text>
            )}
          </View>
        )}
        name="description"
      />
      <ImagePickerComponent name="photos" onChange={setSelectedImages} selectionLimit={5} />
      <Button disabled={isSubmitting} mode="contained" onPress={handleSubmit(submitForm)}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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

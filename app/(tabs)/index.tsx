import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function NewTicket() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Photo:', data.photo);
    console.log('Description:', data.description);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            accessibilityRole="text"
            accessibilityLabel="Name input field"
            accessibilityHint="Enter your name"
            style={styles.input}
            label="Name"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            accessibilityRole="text"
            accessibilityLabel="Email input field"
            accessibilityHint="Enter your email address"
            style={styles.input}
            label="Email"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            accessibilityRole="text"
            accessibilityLabel="Description input field"
            accessibilityHint="Enter description of the issue"
            style={styles.input}
            label="Description"
            numberOfLines={4}
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
        name="description"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            accessibilityRole="text"
            accessibilityLabel="Name input field"
            accessibilityHint="Enter your name"
            style={styles.input}
            label="Photo/Attachment"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="photo"
        defaultValue=""
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    // height: 40,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // marginBottom: 10,
    // paddingHorizontal: 10,
  },
});

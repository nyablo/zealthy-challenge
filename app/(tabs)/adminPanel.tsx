/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type Item = {
  name: string;
  email: string;
  status: string;
};

const ListItem: React.FC<{ item: Item }> = ({ item }) => {
  const handlePress = () => {
    // Handle navigation to detailed view
  };

  return (
    <Pressable onPress={handlePress} style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </Pressable>
  );
};

export default function AdminPanel() {
  const data: Item[] = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'Inactive',
    },
    // Add more items as needed
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.email}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
});

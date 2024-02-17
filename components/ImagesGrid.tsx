import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface Props {
  uris: string[];
  onPress: (uri: string, index: number) => void;
}

const ImagesGrid: React.FC<Props> = ({ uris, onPress }) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.imagesContainer}>
        {uris.map((uri, index) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open image preview ${index + 1}`}
            accessibilityHint="Opens an image preview"
            style={styles.imageWrapper}
            onPress={() => onPress(uri, index)}
            key={`image-${index}`}>
            {({ pressed }) => (
              <Image
                style={[
                  styles.image,
                  { borderColor: pressed ? theme.colors.onPrimary : 'transparent', borderWidth: 2 },
                ]}
                source={{ uri }}
              />
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    width: '33.333%',
    padding: 8,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 4,
  },
});

ImagesGrid.displayName = 'ImagesGrid';

export default ImagesGrid;

import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { useTheme, Text, TouchableRipple } from 'react-native-paper';

interface ImagePickerProps {
  name: string;
  selectionLimit?: number;
  onChange: (assets: ImagePicker.ImagePickerAsset[]) => void;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  name,
  onChange,
  selectionLimit = 10,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
      }
    })();
  }, []);

  const allowsMultipleSelection = selectionLimit > 1;
  const canAddMore = selectedImages.length < selectionLimit;
  const hasSelected = selectedImages.length > 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection,
      selectionLimit: selectionLimit - selectedImages.length,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImages(selectedImages.concat(result.assets));
      if (result.assets.length > 0) {
        onChange(result.assets);
      }
    }
  };

  const deleteImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    onChange(newImages);
  };

  return (
    <TouchableRipple
      onPress={pickImage}
      disabled={!canAddMore}
      accessibilityRole="button"
      accessibilityLabel={`Image picker button: ${name}`}
      accessibilityHint="Opens the image picker"
      style={[
        styles.imagePicker,
        { backgroundColor: theme.colors.background, borderColor: theme.colors.outline },
      ]}>
      <>
        {hasSelected && (
          <View style={styles.imagesContainer}>
            {selectedImages.map(({ uri }, index) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Delete image ${index + 1}`}
                accessibilityHint="Deletes an image from the selected"
                style={styles.imageWrapper}
                onPress={() => deleteImage(index)}
                key={`image-${index}`}>
                {({ pressed }) => (
                  <>
                    <Image style={styles.image} source={{ uri }} />
                    <View
                      style={[
                        styles.deleteButton,
                        { backgroundColor: theme.colors.background, opacity: pressed ? 1 : 0.8 },
                      ]}>
                      <FontAwesome
                        color={pressed ? theme.colors.error : theme.colors.onBackground}
                        size={20}
                        name="trash-o"
                      />
                    </View>
                  </>
                )}
              </Pressable>
            ))}
          </View>
        )}
        <Text
          style={[
            styles.ctaText,
            !canAddMore && { color: theme.colors.onSurfaceDisabled },
            hasSelected && { paddingTop: 4 },
          ]}>
          Add photos
        </Text>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
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
  label: {
    padding: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  imagePicker: {
    marginBottom: 16,
    borderWidth: 1,
    width: '100%',
    borderRadius: 4,
  },
  ctaText: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 16,
  },
  deleteButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'black',
    right: 12,
    top: 12,
  },
});

ImagePickerComponent.displayName = 'ImagePickerComponent';

export default ImagePickerComponent;

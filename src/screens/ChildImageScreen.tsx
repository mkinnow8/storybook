import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {theme} from '../theme/theme';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Header from '../components/Header';
import {useChildContext} from '../context/ChildContext';

type ChildImageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildImage'
>;

const ChildImageScreen = () => {
  const [image, setImage] = useState<Asset | null>(null);
  const navigation = useNavigation<ChildImageScreenNavigationProp>();
  const {updateChildInfo} = useChildContext();
  const {width} = useWindowDimensions();
  const isLargeScreen = width > 768; // iPad and larger screens

  // Calculate responsive sizes
  const imageSize = isLargeScreen ? Math.min(width * 0.4, 400) : 200;
  const maxWidth = isLargeScreen ? 800 : width;

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      const selectedImage = result.assets[0];
      setImage(selectedImage);
    }
  };

  const handleComplete = () => {
    if (image?.uri) {
      updateChildInfo({image: image.uri});
      navigation.navigate('ChildInfoComplete');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Child's Photo" />
      <View style={[styles.content, {maxWidth}]}>
        <Text style={styles.title}>Add a photo of your child</Text>
        <TouchableOpacity
          style={[styles.imageContainer, {width: imageSize, height: imageSize}]}
          onPress={handleImagePick}>
          {image?.uri ? (
            <Image source={{uri: image.uri}} style={styles.image} />
          ) : (
            <Text style={styles.placeholderText}>Tap to add photo</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !image?.uri && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={!image?.uri}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  imageContainer: {
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderStyle: 'dashed',
    ...theme.shadows.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.large,
  },
  placeholderText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  buttonText: {
    ...theme.typography.button,
  },
});

export default ChildImageScreen;

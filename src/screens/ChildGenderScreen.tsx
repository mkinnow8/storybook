import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme/theme';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Header from '../components/Header';
import {useChildContext} from '../context/ChildContext';

type ChildGenderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildGender'
>;

const ChildGenderScreen = () => {
  const [gender, setGender] = useState('');
  const navigation = useNavigation<ChildGenderScreenNavigationProp>();
  const {updateChildInfo} = useChildContext();

  const handleNext = () => {
    if (gender) {
      updateChildInfo({gender: gender as 'male' | 'female' | 'other'});
      navigation.navigate('ChildAge');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Child's Gender" />
      <View style={styles.content}>
        <Text style={styles.title}>What's your child's gender?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, gender === 'male' && styles.selectedOption]}
            onPress={() => setGender('male')}>
            <Text
              style={[
                styles.optionText,
                gender === 'male' && styles.selectedText,
              ]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              gender === 'female' && styles.selectedOption,
            ]}
            onPress={() => setGender('female')}>
            <Text
              style={[
                styles.optionText,
                gender === 'female' && styles.selectedText,
              ]}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, gender === 'other' && styles.selectedOption]}
            onPress={() => setGender('other')}>
            <Text
              style={[
                styles.optionText,
                gender === 'other' && styles.selectedText,
              ]}>
              Other
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, !gender && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!gender}>
          <Text style={styles.buttonText}>Next</Text>
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
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  optionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  option: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.accent,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '700',
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

export default ChildGenderScreen;

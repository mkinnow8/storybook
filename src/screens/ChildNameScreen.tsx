import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

type ChildNameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildName'
>;

const ChildNameScreen = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation<ChildNameScreenNavigationProp>();
  const {updateChildInfo} = useChildContext();

  const handleNext = () => {
    if (name.trim()) {
      updateChildInfo({name: name.trim()});
      navigation.navigate('ChildGender');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Child's Name" showBackButton={false} />
      <View style={styles.content}>
        <Text style={styles.title}>What's your child's name?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter child's name"
            placeholderTextColor={theme.colors.disabled}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!name.trim()}>
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
  inputContainer: {
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    fontSize: theme.typography.body.fontSize,
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

export default ChildNameScreen;

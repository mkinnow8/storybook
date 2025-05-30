import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme/theme';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Header from '../components/Header';
import {useChildContext} from '../context/ChildContext';

type ChildAgeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildAge'
>;

const ChildAgeScreen = () => {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const navigation = useNavigation<ChildAgeScreenNavigationProp>();
  const {updateChildInfo} = useChildContext();
  const {width} = useWindowDimensions();
  const isLargeScreen = width > 768; // iPad and larger screens

  // Calculate responsive sizes
  const buttonSize = isLargeScreen ? Math.min(width * 0.15, 120) : 80;
  const gridGap = isLargeScreen ? theme.spacing.lg : theme.spacing.md;
  const maxWidth = isLargeScreen ? 800 : width;

  const handleNext = () => {
    if (selectedAge !== null) {
      updateChildInfo({age: selectedAge});
      navigation.navigate('ChildImage');
    }
  };

  const renderAgeButton = (age: number) => (
    <TouchableOpacity
      key={age}
      style={[
        styles.ageButton,
        {width: buttonSize, height: buttonSize},
        selectedAge === age && styles.selectedAgeButton,
      ]}
      onPress={() => setSelectedAge(age)}>
      <Text
        style={[
          styles.ageButtonText,
          selectedAge === age && styles.selectedAgeButtonText,
        ]}>
        {age}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Child's Age" />
      <View style={[styles.content, {maxWidth}]}>
        <Text style={styles.title}>How old is your child?</Text>
        <View style={[styles.ageGrid, {gap: gridGap}]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderAgeButton)}
        </View>
        <TouchableOpacity
          style={[styles.button, selectedAge === null && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={selectedAge === null}>
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
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  ageButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  selectedAgeButton: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.accent,
    transform: [{scale: 1.1}],
  },
  ageButtonText: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  selectedAgeButtonText: {
    color: theme.colors.primary,
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

export default ChildAgeScreen;

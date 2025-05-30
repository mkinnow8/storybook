import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';

// Import screens
import ChildNameScreen from '../screens/ChildNameScreen';
import ChildGenderScreen from '../screens/ChildGenderScreen';
import ChildAgeScreen from '../screens/ChildAgeScreen';
import ChildImageScreen from '../screens/ChildImageScreen';
import ChildInfoScreen from '../screens/ChildInfoScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChildName"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#fff'},
        }}>
        <Stack.Screen name="ChildName" component={ChildNameScreen} />
        <Stack.Screen name="ChildGender" component={ChildGenderScreen} />
        <Stack.Screen name="ChildAge" component={ChildAgeScreen} />
        <Stack.Screen name="ChildImage" component={ChildImageScreen} />
        <Stack.Screen name="ChildInfoComplete" component={ChildInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

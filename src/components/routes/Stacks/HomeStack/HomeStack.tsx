import * as React from 'react';
import {View, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Icon, Text} from '@src/components/elements';
import Home from '@src/components/screens/Home';
import PlaceDetails from '@src/components/screens/PlaceDetails';
import PlaceList from '@src/components/screens/PlaceList';
import Checkout from '@src/components/routes/Stacks/CheckoutStack';
import styles from './styles';
import {ScreenNavigationProps} from '../types';

import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

type HomeStackProps = {} & ScreenNavigationProps;
type HomeStackParamList = {
  HomeScreen: undefined;
  PlaceDetailsScreen: undefined;
  CheckoutScreen: undefined;
  PlaceListScreen: {
    title?: string;
  };
};
const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<HomeStackProps> = ({navigation}) => {
  
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permission not granted',
      'Allow the app to use location service.',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }

  let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const _renderExploreHeaderTitle = () => {
    return (
      <View style={styles.headerLeftContainer}>
        <Icon
          name="map-marker-alt"
          size={18}
          style={styles.locationIcon}
          isPrimary
        />
        <Text style={styles.headerTitle}>{displayCurrentAddress}</Text>
      </View>
    );
  };

  const _renderExploreHeaderRight = () => {
    return (
      <Icon
        name="notifications"
        size={22}
        isPrimary
        useIonicons
        onPress={() => navigation.navigate('Notifications')}
      />
    );
  };

  const _renderPlaceDetailHeaderRight = () => {
    return (
      <Button
        isTransparent
        onPress={() => navigation.navigate('SearchDishesModal')}>
        <Icon name="md-search" size={22} isPrimary useIonicons />
      </Button>
    );
  };

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        options={() => {
          return {
            headerTitle: _renderExploreHeaderTitle,
            title: 'Explore',
            headerTitleAlign: 'left',
            headerRight: _renderExploreHeaderRight,
            headerRightContainerStyle: styles.headerRightContainer,
          };
        }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={() => {
          return {
            headerTitle: 'Neapolitan Pizza',
            headerRight: _renderPlaceDetailHeaderRight,
            headerRightContainerStyle: styles.headerRightContainer,
          };
        }}
        name="PlaceDetailsScreen"
        component={PlaceDetails}
      />
      <Stack.Screen
        options={({route: {params}}) => {
          return {
            headerTitle: params?.title || 'Places',
          };
        }}
        name="PlaceListScreen"
        component={PlaceList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CheckoutScreen"
        component={Checkout}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

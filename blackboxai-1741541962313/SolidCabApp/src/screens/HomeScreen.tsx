import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AppNavigationProps } from '../../App';
import { TripTypeSelector } from '../components/TripTypeSelector';
import { LocationDropdown } from '../components/LocationDropdown';
import { DateTimeSelector } from '../components/DateTimeSelector';
import { CarCard } from '../components/CarCard';

type TripType = 'oneWay' | 'roundTrip';

export const HomeScreen = ({ navigation }: AppNavigationProps<'DrawerHome'>) => {
  const [tripType, setTripType] = useState<TripType>('oneWay');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const cars = [
    {
      id: '1',
      name: 'Economy',
      type: 'Sedan',
      price: 1.5,
      seats: 4,
      imageUrl: 'https://example.com/economy.jpg',
    },
    {
      id: '2',
      name: 'Premium',
      type: 'SUV',
      price: 2.5,
      seats: 6,
      imageUrl: 'https://example.com/premium.jpg',
    },
    {
      id: '3',
      name: 'Luxury',
      type: 'Sedan',
      price: 3.5,
      seats: 4,
      imageUrl: 'https://example.com/luxury.jpg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TripTypeSelector
            selectedType={tripType}
            onSelect={setTripType}
          />

          <LocationDropdown
            label="Pickup Location"
            placeholder="Enter pickup location"
            value={pickup}
            onChangeText={setPickup}
          />

          <LocationDropdown
            label="Drop-off Location"
            placeholder="Enter drop-off location"
            value={dropoff}
            onChangeText={setDropoff}
          />

          <DateTimeSelector
            label="Pickup Time"
            date={date}
            onPress={() => {
              // Implement date picker
            }}
          />

          {tripType === 'roundTrip' && (
            <DateTimeSelector
              label="Return Time"
              date={new Date(date.getTime() + 24 * 60 * 60 * 1000)}
              onPress={() => {
                // Implement date picker
              }}
            />
          )}

          <View style={styles.carsContainer}>
            {cars.map((car) => (
              <CarCard
                key={car.id}
                name={car.name}
                type={car.type}
                price={car.price}
                seats={car.seats}
                imageUrl={car.imageUrl}
                isSelected={selectedCar === car.id}
                onSelect={() => setSelectedCar(car.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  carsContainer: {
    marginTop: 20,
  },
});

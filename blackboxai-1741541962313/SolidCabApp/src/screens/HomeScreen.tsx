import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerScreenProps } from '../types/navigation';
import { theme } from '../styles/theme';
import {
  Button,
  CarCard,
  DateTimeSelector,
  ErrorMessage,
  FareDetailsModal,
  LocationDropdown,
  TripTypeSelector,
} from '../components';
import { BookingService } from '../api/BookingService';
import { Location, CarType, FareDetails, BookingRequest } from '../types/api';

export type HomeScreenProps = DrawerScreenProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const [date, setDate] = useState(new Date());
  const [tripType, setTripType] = useState<'ONE_WAY' | 'ROUND_TRIP'>('ONE_WAY');
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [carTypes, setCarTypes] = useState<CarType[]>([]);
  const [fareDetails, setFareDetails] = useState<FareDetails | null>(null);
  const [showFareModal, setShowFareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load car types on mount
  React.useEffect(() => {
    loadCarTypes();
  }, []);

  const loadCarTypes = async () => {
    try {
      const response = await BookingService.getCarTypes();
      if (response.success && response.data) {
        setCarTypes(response.data);
      } else {
        setError('Failed to load car types');
      }
    } catch (err) {
      setError('An error occurred while loading car types');
    }
  };

  const calculateFare = useCallback(async () => {
    if (!pickupLocation || !dropLocation || !selectedCar) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await BookingService.calculateFare(
        pickupLocation,
        dropLocation,
        selectedCar.id
      );

      if (response.success && response.data) {
        setFareDetails(response.data);
        setShowFareModal(true);
      } else {
        setError('Failed to calculate fare');
      }
    } catch (err) {
      setError('An error occurred while calculating fare');
    } finally {
      setLoading(false);
    }
  }, [pickupLocation, dropLocation, selectedCar]);

  const handleBooking = async () => {
    if (!pickupLocation || !dropLocation || !selectedCar) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingRequest: BookingRequest = {
        pickupLocation,
        dropLocation,
        date: date.toISOString(),
        time: date.toISOString(),
        carType: selectedCar.id,
        tripType,
        passengers: selectedCar.capacity,
      };

      const response = await BookingService.createBooking(bookingRequest);

      if (response.success && response.data) {
        navigation.navigate('BookingConfirmation', {
          bookingId: response.data.id,
          pickupLocation: response.data.pickupLocation.name,
          dropLocation: response.data.dropLocation.name,
          date: response.data.date,
          time: response.data.time,
          carType: response.data.carType.name,
          fare: response.data.fare.total,
        });
      } else {
        setError('Failed to create booking');
      }
    } catch (err) {
      setError('An error occurred while creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <LocationDropdown
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Pickup Location"
            style={styles.input}
          />

          <LocationDropdown
            value={dropLocation}
            onChange={setDropLocation}
            placeholder="Drop Location"
            style={styles.input}
          />

          <DateTimeSelector
            date={date}
            onDateChange={setDate}
            style={styles.input}
          />

          <TripTypeSelector
            value={tripType}
            onChange={setTripType}
            style={styles.input}
          />

          {error && (
            <ErrorMessage
              message={error}
              type="error"
              containerStyle={styles.error}
            />
          )}

          <View style={styles.carList}>
            {carTypes.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                selected={selectedCar?.id === car.id}
                onSelect={setSelectedCar}
                disabled={loading}
              />
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Calculate Fare"
            onPress={calculateFare}
            disabled={!pickupLocation || !dropLocation || !selectedCar || loading}
            loading={loading}
            style={styles.button}
          />

          <Button
            title="Book Now"
            variant="primary"
            onPress={handleBooking}
            disabled={!pickupLocation || !dropLocation || !selectedCar || loading}
            loading={loading}
            style={styles.button}
          />
        </View>
      </ScrollView>

      {fareDetails && (
        <FareDetailsModal
          visible={showFareModal}
          onClose={() => setShowFareModal(false)}
          fareDetails={fareDetails}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  form: {
    gap: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  error: {
    marginBottom: theme.spacing.md,
  },
  carList: {
    gap: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
});

export default HomeScreen;

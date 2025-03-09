import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FareDetailsModal } from '../components/FareDetailsModal';

export const BookingDetailsScreen = () => {
  const [fareModalVisible, setFareModalVisible] = useState(false);

  const fareDetails = {
    baseFare: 50,
    distance: 15,
    ratePerKm: 2,
    tax: 10,
    discount: 5,
    total: 85,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trip Details</Text>
            
            <View style={styles.locationContainer}>
              <View style={styles.locationItem}>
                <Icon name="location-on" size={24} color="#007AFF" />
                <View style={styles.locationText}>
                  <Text style={styles.locationLabel}>Pickup Location</Text>
                  <Text style={styles.locationValue}>123 Main St, City</Text>
                </View>
              </View>
              
              <View style={styles.locationDivider} />
              
              <View style={styles.locationItem}>
                <Icon name="location-on" size={24} color="#34C759" />
                <View style={styles.locationText}>
                  <Text style={styles.locationLabel}>Drop-off Location</Text>
                  <Text style={styles.locationValue}>456 Park Ave, City</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vehicle Details</Text>
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleName}>Premium SUV</Text>
              <Text style={styles.vehicleType}>6 Seater</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fare Details</Text>
            <TouchableOpacity 
              style={styles.fareButton}
              onPress={() => setFareModalVisible(true)}
            >
              <View style={styles.fareInfo}>
                <Text style={styles.fareLabel}>Total Fare</Text>
                <Text style={styles.fareAmount}>${fareDetails.total}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FareDetailsModal
        visible={fareModalVisible}
        onClose={() => setFareModalVisible(false)}
        fareDetails={fareDetails}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  locationContainer: {
    marginTop: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
  },
  locationValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  locationDivider: {
    height: 24,
    width: 1,
    backgroundColor: '#ddd',
    marginLeft: 12,
    marginVertical: 8,
  },
  vehicleDetails: {
    marginTop: 8,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  fareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fareInfo: {
    flex: 1,
  },
  fareLabel: {
    fontSize: 14,
    color: '#666',
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

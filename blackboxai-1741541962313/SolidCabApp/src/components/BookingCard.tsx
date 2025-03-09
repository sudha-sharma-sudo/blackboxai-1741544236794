import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BookingCardProps {
  bookingId: string;
  pickupLocation: string;
  dropLocation: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  onPress: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  bookingId,
  pickupLocation,
  dropLocation,
  date,
  status,
  price,
  onPress,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming':
        return '#007AFF';
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.bookingId}>Booking #{bookingId}</Text>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
      
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Icon name="location-on" size={20} color="#007AFF" />
          <Text style={styles.locationText}>{pickupLocation}</Text>
        </View>
        <View style={styles.locationDivider} />
        <View style={styles.locationRow}>
          <Icon name="location-on" size={20} color="#34C759" />
          <Text style={styles.locationText}>{dropLocation}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  locationDivider: {
    height: 20,
    width: 1,
    backgroundColor: '#ddd',
    marginLeft: 10,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
});

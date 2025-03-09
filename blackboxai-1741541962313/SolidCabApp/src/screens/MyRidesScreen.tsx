import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { BookingCard } from '../components/BookingCard';

type RideStatus = 'upcoming' | 'completed' | 'cancelled';

interface Ride {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  date: Date;
  status: RideStatus;
  price: number;
}

export const MyRidesScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState<RideStatus | 'all'>('all');

  const rides: Ride[] = [
    {
      id: '1',
      pickupLocation: '123 Main St, City',
      dropLocation: '456 Park Ave, City',
      date: new Date(),
      status: 'upcoming',
      price: 85,
    },
    {
      id: '2',
      pickupLocation: '789 Oak Rd, City',
      dropLocation: '321 Pine St, City',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed',
      price: 65,
    },
    {
      id: '3',
      pickupLocation: '159 Elm St, City',
      dropLocation: '753 Maple Ave, City',
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'cancelled',
      price: 75,
    },
  ];

  const filteredRides = selectedFilter === 'all'
    ? rides
    : rides.filter(ride => ride.status === selectedFilter);

  const FilterButton = ({ title, filter }: { title: string; filter: RideStatus | 'all' }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === filter && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterButton title="All" filter="all" />
        <FilterButton title="Upcoming" filter="upcoming" />
        <FilterButton title="Completed" filter="completed" />
        <FilterButton title="Cancelled" filter="cancelled" />
      </View>

      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingCard
            bookingId={item.id}
            pickupLocation={item.pickupLocation}
            dropLocation={item.dropLocation}
            date={item.date}
            status={item.status}
            price={item.price}
            onPress={() => navigation.navigate('BookingDetails', { bookingId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rides found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

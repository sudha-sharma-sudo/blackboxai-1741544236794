import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type TripType = 'oneWay' | 'roundTrip';

interface Props {
  selectedType: TripType;
  onSelect: (type: TripType) => void;
}

export const TripTypeSelector: React.FC<Props> = ({ selectedType, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedType === 'oneWay' && styles.selectedButton,
        ]}
        onPress={() => onSelect('oneWay')}
      >
        <Text style={[
          styles.buttonText,
          selectedType === 'oneWay' && styles.selectedText,
        ]}>One-Way</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedType === 'roundTrip' && styles.selectedButton,
        ]}
        onPress={() => onSelect('roundTrip')}
      >
        <Text style={[
          styles.buttonText,
          selectedType === 'roundTrip' && styles.selectedText,
        ]}>Round Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
});

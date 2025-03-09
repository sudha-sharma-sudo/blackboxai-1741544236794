import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FareBreakdown {
  baseFare: number;
  distance: number;
  ratePerKm: number;
  tax: number;
  discount?: number;
  total: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  fareDetails: FareBreakdown;
}

export const FareDetailsModal: React.FC<Props> = ({
  visible,
  onClose,
  fareDetails,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Fare Breakdown</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Base Fare</Text>
              <Text style={styles.fareValue}>${fareDetails.baseFare.toFixed(2)}</Text>
            </View>

            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Distance ({fareDetails.distance} km)</Text>
              <Text style={styles.fareValue}>
                ${(fareDetails.distance * fareDetails.ratePerKm).toFixed(2)}
              </Text>
            </View>

            {fareDetails.discount && (
              <View style={styles.fareItem}>
                <Text style={[styles.fareLabel, styles.discountText]}>Discount</Text>
                <Text style={[styles.fareValue, styles.discountText]}>
                  -${fareDetails.discount.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.fareItem}>
              <Text style={styles.fareLabel}>Tax</Text>
              <Text style={styles.fareValue}>${fareDetails.tax.toFixed(2)}</Text>
            </View>

            <View style={[styles.fareItem, styles.totalItem]}>
              <Text style={styles.totalLabel}>Total Fare</Text>
              <Text style={styles.totalValue}>${fareDetails.total.toFixed(2)}</Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fareLabel: {
    fontSize: 16,
    color: '#666',
  },
  fareValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  discountText: {
    color: '#34C759',
  },
  totalItem: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  ViewStyle,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { theme } from '../styles/theme';
import dayjs from 'dayjs';

export interface DateTimeSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  style?: ViewStyle;
  disabled?: boolean;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  onDateChange,
  minDate = new Date(),
  maxDate,
  style,
  disabled = false,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(date);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setShowTimePicker(true);
    }

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (Platform.OS === 'ios') {
        setTempDate(newDate);
      } else {
        handleConfirm(newDate);
      }
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (Platform.OS === 'ios') {
        setTempDate(newDate);
      } else {
        handleConfirm(newDate);
      }
    }
  };

  const handleConfirm = (selectedDate: Date) => {
    setShowDatePicker(false);
    setShowTimePicker(false);
    onDateChange(selectedDate);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
    setTempDate(date);
  };

  const renderIOSModal = () => (
    <Modal
      visible={showDatePicker || showTimePicker}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleConfirm(tempDate)}
            >
              <Text style={[styles.modalButton, styles.confirmButton]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode={showDatePicker ? 'date' : 'time'}
            display="spinner"
            onChange={showDatePicker ? handleDateChange : handleTimeChange}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </View>
      </View>
    </Modal>
  );

  const formattedDate = dayjs(date).format('MMM D, YYYY');
  const formattedTime = dayjs(date).format('h:mm A');

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.selector, disabled && styles.disabled]}
        onPress={() => !disabled && setShowDatePicker(true)}
        disabled={disabled}
      >
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.selector, disabled && styles.disabled]}
        onPress={() => !disabled && setShowTimePicker(true)}
        disabled={disabled}
      >
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{formattedTime}</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        renderIOSModal()
      ) : (
        <>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              onChange={handleTimeChange}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  selector: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.light,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.background.paper,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalButton: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
  },
  confirmButton: {
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default DateTimeSelector;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { theme } from '../styles/theme';
import { CarType } from '../types/api';

export interface CarCardProps {
  car: CarType;
  selected?: boolean;
  onSelect?: (car: CarType) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  selected = false,
  onSelect,
  style,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect(car);
    }
  };

  const getImage = (): ImageSourcePropType => {
    // In a real app, you would handle image loading from a CDN or local assets
    return { uri: car.image } as ImageSourcePropType;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.imageContainer}>
        <Image source={getImage()} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{car.name}</Text>
          <Text style={styles.price}>
            ${car.basePrice}
            <Text style={styles.unit}>/ride</Text>
          </Text>
        </View>
        <Text style={styles.description}>{car.description}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Capacity</Text>
            <Text style={styles.detailValue}>{car.capacity} seats</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rate/km</Text>
            <Text style={styles.detailValue}>${car.pricePerKm}/km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.light,
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  disabled: {
    opacity: 0.6,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  price: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  unit: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxs,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
});

export default CarCard;

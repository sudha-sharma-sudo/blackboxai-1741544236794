import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ViewStyle,
} from 'react-native';
import { theme } from '../styles/theme';
import { Location } from '../types/api';
import BookingService from '../api/BookingService';
import ErrorMessage from './ErrorMessage';

export interface LocationDropdownProps {
  value: Location | null;
  onChange: (location: Location) => void;
  placeholder: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  value,
  onChange,
  placeholder,
  style,
  disabled = false,
}) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const searchLocations = async () => {
      if (query.length < 2) {
        setLocations([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await BookingService.searchLocations(query);
        if (response.success && response.data) {
          setLocations(response.data);
        } else {
          setError('Failed to fetch locations');
        }
      } catch (err) {
        setError('An error occurred while searching');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      timeoutId = setTimeout(searchLocations, 500);
    } else {
      setLocations([]);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [query]);

  const handleSelect = (location: Location) => {
    onChange(location);
    setQuery('');
    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setShowDropdown(true);
    }
  };

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.locationName}>{item.name}</Text>
      <Text style={styles.locationAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, disabled && styles.disabled]}
        value={value ? value.name : query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.disabled}
        onFocus={handleFocus}
        editable={!disabled}
      />

      {showDropdown && (
        <View style={styles.dropdown}>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              color={theme.colors.primary}
            />
          ) : error ? (
            <ErrorMessage
              message={error}
              type="error"
              containerStyle={styles.error}
            />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
            />
          ) : query.length >= 2 ? (
            <Text style={styles.noResults}>No locations found</Text>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    ...theme.shadows.light,
  },
  disabled: {
    opacity: 0.6,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    maxHeight: 200,
    ...theme.shadows.medium,
    zIndex: theme.zIndex.dropdown,
  },
  loader: {
    padding: theme.spacing.md,
  },
  error: {
    margin: theme.spacing.sm,
  },
  list: {
    padding: theme.spacing.xs,
  },
  locationItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  locationName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationAddress: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  noResults: {
    padding: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
});

export default LocationDropdown;

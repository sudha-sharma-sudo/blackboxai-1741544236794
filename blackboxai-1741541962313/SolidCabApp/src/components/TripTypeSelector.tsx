import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { theme } from '../styles/theme';

export type TripType = 'ONE_WAY' | 'ROUND_TRIP';

export interface TripTypeSelectorProps {
  value: TripType;
  onChange: (type: TripType) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({
  value,
  onChange,
  style,
  disabled = false,
}) => {
  const slideAnim = React.useRef(new Animated.Value(value === 'ONE_WAY' ? 0 : 1)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: value === 'ONE_WAY' ? 0 : 1,
      duration: theme.animation.duration.normal,
      useNativeDriver: false,
    }).start();
  }, [value, slideAnim]);

  const handlePress = (type: TripType) => {
    if (!disabled && type !== value) {
      onChange(type);
    }
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjust based on your button width
  });

  return (
    <View style={[styles.container, style, disabled && styles.disabled]}>
      <Animated.View
        style={[
          styles.selector,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress('ONE_WAY')}
        disabled={disabled}
      >
        <Text
          style={[
            styles.optionText,
            value === 'ONE_WAY' && styles.selectedText,
          ]}
        >
          One Way
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handlePress('ROUND_TRIP')}
        disabled={disabled}
      >
        <Text
          style={[
            styles.optionText,
            value === 'ROUND_TRIP' && styles.selectedText,
          ]}
        >
          Round Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.xs,
    position: 'relative',
    height: 40,
    ...theme.shadows.light,
  },
  disabled: {
    opacity: 0.6,
  },
  selector: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    width: '48%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  selectedText: {
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default TripTypeSelector;

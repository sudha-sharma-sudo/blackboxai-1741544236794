import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../styles/theme';

export interface ErrorMessageProps {
  message: string;
  retry?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  retry,
  containerStyle,
  textStyle,
  type = 'error',
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.primary;
      default:
        return theme.colors.error;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${getBackgroundColor()}15` },
        containerStyle,
      ]}
    >
      <Text
        style={[
          styles.message,
          { color: getBackgroundColor() },
          textStyle,
        ]}
      >
        {message}
      </Text>
      {retry && (
        <TouchableOpacity onPress={retry} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: getBackgroundColor() }]}>
            Retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  retryButton: {
    marginLeft: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  retryText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default ErrorMessage;

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  DimensionValue,
} from 'react-native';
import { theme } from '../styles/theme';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border.main;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.disabled;
    switch (variant) {
      case 'primary':
      case 'secondary':
        return theme.colors.text.inverse;
      case 'outline':
      case 'text':
        return theme.colors.primary;
      default:
        return theme.colors.text.inverse;
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.border.main;
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      default:
        return 'transparent';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return theme.spacing.sm;
      case 'large':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const buttonStyles: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    padding: getPadding(),
    width: fullWidth ? '100%' as DimensionValue : 'auto',
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    gap: theme.spacing.sm,
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
});

export default Button;

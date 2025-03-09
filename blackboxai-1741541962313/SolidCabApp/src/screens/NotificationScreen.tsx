import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Notification {
  id: string;
  type: 'ride' | 'promo' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export const NotificationScreen = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'ride',
      title: 'Your ride is confirmed',
      message: 'Your ride to Downtown has been confirmed. Driver will arrive in 5 minutes.',
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: '2',
      type: 'promo',
      title: 'Weekend Special Offer',
      message: 'Get 20% off on all rides this weekend using code WEEKEND20.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: '3',
      type: 'system',
      title: 'App Update Available',
      message: 'A new version of the app is available. Update now for the latest features.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'ride':
        return 'directions-car';
      case 'promo':
        return 'local-offer';
      case 'system':
        return 'system-update';
      default:
        return 'notifications';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
    >
      <View style={[
        styles.notificationIcon,
        !item.isRead && styles.unreadNotificationIcon,
      ]}>
        <Icon 
          name={getNotificationIcon(item.type)}
          size={24}
          color={!item.isRead ? '#007AFF' : '#666'}
        />
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={[
          styles.notificationTitle,
          !item.isRead && styles.unreadNotificationText,
        ]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>
          {item.timestamp.toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'short',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off" size={48} color="#666" />
            <Text style={styles.emptyText}>No notifications</Text>
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
  listContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    backgroundColor: '#f0f7ff',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadNotificationIcon: {
    backgroundColor: '#e6f2ff',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 16,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  unreadNotificationText: {
    fontWeight: '600',
    color: '#007AFF',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});

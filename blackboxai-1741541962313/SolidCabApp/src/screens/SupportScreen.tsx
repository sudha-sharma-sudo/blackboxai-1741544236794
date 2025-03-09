import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FAQItem {
  question: string;
  answer: string;
}

export const SupportScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I book a ride?',
      answer: 'To book a ride, simply open the app, enter your pickup and drop-off locations, select your preferred vehicle type, and confirm your booking. You can also schedule rides in advance.',
    },
    {
      question: 'How do I cancel a ride?',
      answer: 'You can cancel a ride by going to your active bookings and selecting the cancel option. Please note that cancellation fees may apply depending on how close to the pickup time you cancel.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit and debit cards, as well as various digital payment methods. You can manage your payment methods in the Wallet section.',
    },
    {
      question: 'How is the fare calculated?',
      answer: 'Fares are calculated based on the distance, time of day, vehicle type, and current demand. You can see a detailed fare breakdown before confirming your booking.',
    },
  ];

  const supportOptions = [
    {
      icon: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
    },
    {
      icon: 'call',
      title: 'Call Us',
      description: '24/7 customer support',
    },
    {
      icon: 'email',
      title: 'Email',
      description: 'Send us your query',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.supportOptionsContainer}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.supportOption}>
                <View style={styles.supportOptionIcon}>
                  <Icon name={option.icon} size={24} color="#007AFF" />
                </View>
                <Text style={styles.supportOptionTitle}>{option.title}</Text>
                <Text style={styles.supportOptionDescription}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.faqContainer}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            {faqs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => setExpandedFaq(expandedFaq === faq.question ? null : faq.question)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Icon
                    name={expandedFaq === faq.question ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#666"
                  />
                </View>
                {expandedFaq === faq.question && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  supportOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  supportOption: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  supportOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  supportOptionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
});

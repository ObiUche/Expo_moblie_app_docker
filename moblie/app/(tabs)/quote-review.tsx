import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

interface QuoteType {
  id: string;
  name: string;
  clothingItem: string;
  images?: string[];
}

interface CostType {
  clothingCost: number;
  uberCost: number;
  total: number;
}

const calculateUberCost = (distance: number): number => {
  const baseFare = 2;
  const perMile = 1.5;
  const perMinute = 0.5;
  const estimatedTime = distance * 3;
  return baseFare + (distance * perMile) + (estimatedTime * perMinute);
};

const calculateClothingCost = (clothingItem: string): number => {
  const prices: Record<string, number> = {
    'dress': 50,
    'shirt': 20,
    'pants': 30,
    'jacket': 60,
    'skirt': 25,
  };
  
  for (const [item, price] of Object.entries(prices)) {
    if (clothingItem.toLowerCase().includes(item)) {
      return price;
    }
  }
  return 40;
};

export default function QuoteReviewScreen() {
  const [quotes, setQuotes] = useState<QuoteType[]>([
    // Mock data - Firebase removed
    { id: '1', name: 'John Doe', clothingItem: 'Dress repair', images: [] },
    { id: '2', name: 'Jane Smith', clothingItem: 'Jeans hemming', images: [] },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock loading - Firebase removed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateTotalCost = (clothingItem: string, distance = 5): CostType => {
    const clothingCost = calculateClothingCost(clothingItem);
    const uberCost = calculateUberCost(distance) * 2;
    return {
      clothingCost,
      uberCost,
      total: clothingCost + uberCost,
    };
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>
          Quote Estimates
        </ThemedText>

        {loading ? (
          <ThemedText>Loading quotes...</ThemedText>
        ) : quotes.length === 0 ? (
          <ThemedText>No quotes found. Submit a quote request first.</ThemedText>
        ) : (
          quotes.map((quote) => {
            const costs = calculateTotalCost(quote.clothingItem);
            
            return (
              <View key={quote.id} style={styles.quoteCard}>
                <ThemedText style={styles.quoteTitle}>
                  {quote.name} - {quote.clothingItem}
                </ThemedText>
                
                <View style={styles.costSection}>
                  <View style={styles.costRow}>
                    <ThemedText>Clothing Alteration:</ThemedText>
                    <ThemedText>£{costs.clothingCost.toFixed(2)}</ThemedText>
                  </View>
                  
                  <View style={styles.costRow}>
                    <ThemedText>Uber Transport (Round Trip):</ThemedText>
                    <ThemedText>£{costs.uberCost.toFixed(2)}</ThemedText>
                  </View>
                  
                  <View style={styles.separator} />
                  
                  <View style={[styles.costRow, styles.totalRow]}>
                    <ThemedText style={styles.totalLabel}>Total Estimated Cost:</ThemedText>
                    <ThemedText style={styles.totalAmount}>
                      £{costs.total.toFixed(2)}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.imagePreview}>
                  {quote.images && quote.images.slice(0, 3).map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <ThemedText style={styles.imageNumber}>Image {index + 1}</ThemedText>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => Alert.alert('Accepted', `Accepted quote from ${quote.name}`)}
                >
                  <Text style={styles.acceptButtonText}>Accept Quote</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  costSection: {
    marginBottom: 15,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  totalRow: {
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007AFF',
  },
  imagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNumber: {
    color: '#666',
  },
  acceptButton: {
    backgroundColor: '#34C759',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
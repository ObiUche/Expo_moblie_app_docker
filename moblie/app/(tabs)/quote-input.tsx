import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function QuoteInputScreen() {
    const [name, setName] = useState('');
    const [clothingItem, setClothingItem] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        if(images.length >= 5){
            Alert.alert('Limit Reached', 'You can upload a maximum of 5 images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if(!result.canceled){
            setImages([...images, result.assets[0].uri]);
        }
    };

    const submitQuote = async () => {
        if(!name || !clothingItem || images.length === 0){
            Alert.alert('Please fill all field and upload at least one image.');
            return;
        }
        setUploading(true);
        try {
            // Mock submission - Firebase removed
            Alert.alert('Success', 'Quote submitted! (Firebase disabled for now)');
            setName('');
            setClothingItem('');
            setImages([]);
        } catch (error) {
            Alert.alert('Error', 'There was an error submitting your request.');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };
        
    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ThemedText type="title" style={styles.title}>
                    Clothing Quote Request
                </ThemedText>

                <TextInput
                    style={styles.input}
                    placeholder="Your Name" 
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#666"
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Clothing Item Description"
                    value={clothingItem}
                    onChangeText={setClothingItem}
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                />

                <ThemedText style={styles.sectionTitle}>Upload Images ({images.length}/5)</ThemedText>

                <View style={styles.imageContainer}>
                    {images.map((uri,index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{uri}} style={styles.image} />
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => {
                                    setImages(images.filter((_, i) => i !== index));
                                }}
                            >
                                <Text style={styles.removeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {images.length < 5 && (
                        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                            <Text style={styles.addButtonText}>+</Text>
                            <Text style={styles.addButtonLabel}>Add Image</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    style={[styles.submitButton, uploading && styles.disabledButton]}
                    onPress={submitQuote}
                    disabled={uploading}
                >
                    <Text style={styles.submitButtonText}>
                        {uploading ? 'Submitting...' : 'Submit Quote Request'}
                    </Text>
                </TouchableOpacity>
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
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#666',
  },
  addButtonLabel: {
    color: '#666',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
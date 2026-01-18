import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
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

    const uploadImages = async (uris: string[]) => {
        const uploadPromises = uris.map(async (uris, index) => {
            const response = await fetch(uris);
        })
    }
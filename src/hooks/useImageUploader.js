import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const useImageUploader = () => {
    const [imageUrls, setImageUrls] = useState([]);

    const uploadImages = async (files) => {
        try {
            // Initialize Firebase
            const firebaseConfig = {
                // Add your Firebase configuration here
                apiKey: "AIzaSyAdGPkYwQk8xZQ3koCllRq4Jim6GWqM5Kc",
                authDomain: "uploadimages-f41ef.firebaseapp.com",
                projectId: "uploadimages-f41ef",
                storageBucket: "uploadimages-f41ef.appspot.com",
                messagingSenderId: "930643986579",
                appId: "1:930643986579:web:c83a1fcaacfd415c52e566"
            };
            firebase.initializeApp(firebaseConfig);

            // Create a storage reference
            const storageRef = firebase.storage().ref();

            // Upload each file to Firebase Storage
            const uploadedUrls = await Promise.all(
                Array.from(files).map(async (file) => {
                    // Generate a unique ID for the image
                    const imageId = Date.now().toString();

                    // Upload the file to Firebase Storage
                    const imageRef = storageRef.child(`images/${imageId}`);
                    const snapshot = await imageRef.put(file);

                    // Get the image URL
                    const downloadUrl = await snapshot.ref.getDownloadURL();
                    return downloadUrl;
                })
            );

            // Set the image URLs in the state
            setImageUrls(uploadedUrls);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return { imageUrls, uploadImages };
};

export default useImageUploader;



import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Button, Image, Text, View } from 'react-native';


export default function App(){
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(()=>{
    (async ()=>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  },[]);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
    }
 };



 return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      {image && 
      
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      }
      
      <Button title="ADD POST" onPress={pickImage} disabled={!hasGalleryPermission} />
      

    </View>
 );
}


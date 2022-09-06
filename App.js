import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, Button} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {

  const directory = FileSystem.documentDirectory
  console.log(directory)

  const permissions =  FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (permissions.granted) {
    const uri = permissions.directoryUri;
  
    const files = StorageAccessFramework.readDirectoryAsync(uri);
    console.log('este es el archivo',files)
    alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
  }
  
  useEffect(() => {
    console.log('holaksjd')
    // requestMultimediaPermission();
  },[]);


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

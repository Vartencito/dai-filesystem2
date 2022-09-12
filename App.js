import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {

  // const directory = FileSystem.documentDirectory;
  // console.log('directorio',directory)  

  const readAndAccessToDirectory = async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    console.log('parte 1, permissions', permissions)
    if (permissions.granted) {
      const uri = permissions.directoryUri;
      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);
      alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
    }
  }

  const createDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      console.log('parte 2, permissions', permissions)
      if (permissions.granted) {
        const uri = permissions.directoryUri;
        await FileSystem.StorageAccessFramework.makeDirectoryAsync(uri, 'prueba');
        alert(`directory "prueba" created`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      console.log('parte 3, permissions', permissions)
      if (permissions.granted) {
        const uri = permissions.directoryUri;
        await FileSystem.StorageAccessFramework.deleteAsync(uri);
        alert(`directory deleted`);
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text></Text>
      <Button
        onPress={readAndAccessToDirectory}
        title="Read and access to directory"
        style={styles.button}
      />
      <Text></Text>
      <Button
        onPress={createDirectory}
        title="Create directory"
        style={styles.button}
      />
      <Text></Text>
      <Button
        onPress={deleteDirectory}
        title="Delete directory"
        style={styles.button}
      />
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

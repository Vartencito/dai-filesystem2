import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() { 

  const [nombreDirectorio, setNombreDirectorio] = useState(null)

  const readDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const uri = permissions.directoryUri;
        const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri);
        alert(`Archivos dentro de: ${uri}:\n\n${JSON.stringify(files)}`);
      }
    } catch (error) {
      alert(`directorio no accesible, selecciona otro`);
      console.log(error)
    }
  }

  const createDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const uri = permissions.directoryUri;
        await FileSystem.StorageAccessFramework.makeDirectoryAsync(uri, nombreDirectorio);
        alert(`directorio "${nombreDirectorio}" creado`);
      }
    } catch (error) {
      alert(`directorio no accesible, selecciona otro`);
      console.log(error)
    }
  }

  const deleteDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const uri = permissions.directoryUri;
        await FileSystem.StorageAccessFramework.deleteAsync(uri);
        alert(`directorio eliminado`);
      } 
    } catch (error) {
      alert(`directorio no accesible`);
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Ejemplos del FileSystem {`(Hecho con expo-file-system)`}</Text>
      <Text></Text>
      <Button
        onPress={readDirectory}
        title="Read directory"
        style={styles.button}
      />
      <Text></Text>
      <Button
        onPress={createDirectory}
        title="Create directory"
        style={styles.button}
      />
      <Text></Text>
      <TextInput
      style={styles.input}
      onChangeText={setNombreDirectorio}
      placeholder={'Nombre del directorio'}
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
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

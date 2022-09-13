import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, Pressable } from 'react-native';
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
      if (nombreDirectorio === null) {
        alert(`ponele un nombre al directorio`);        
      }
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
      <Text style={styles.titulo}>Ejemplos del FileSystem {`(Hecho con expo-file-system)`}</Text>
      <Text></Text>
      <Pressable
      onPress={readDirectory}
      style={styles.boton}>
        <Text style={styles.texto}>Leer directorio</Text>
        </Pressable>
      <Text></Text>

      <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}>
      <TextInput
      style={styles.input}
      onChangeText={setNombreDirectorio}
      placeholder={'Nombre del directorio'}
      />
        <Text></Text>
      <Pressable
      onPress={createDirectory}
      style={styles.boton}>
        <Text style={styles.texto}>Crear directorio</Text>
        </Pressable>

      </View>
      <Text></Text>

      <Pressable
      onPress={deleteDirectory}
      style={styles.botonEliminar}>
        <Text style={styles.texto}>Eliminar directorio</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //#bd12e3
    flex: 1,
    backgroundColor: '#9508cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 100,
    marginRight: "4%",
    width: 200
  },
  boton:{
    borderRadius: 100,
    backgroundColor: "#bd12e3",
    height: 40,
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  texto:{
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold"
  },
  botonEliminar:{
    borderRadius: 100,
    backgroundColor: "#c92037",
    height: 40,
    width: "34%",
    justifyContent: "center",
    alignItems: "center"
  },
  titulo:{
    color: "#FFF",
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    margin: 30
  }
});

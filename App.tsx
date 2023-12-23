import React, { useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, Theme} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Provider } from 'react-redux'
import Editor from './components/Editor';
import NotesList from './components/NotesList';

export default function App() {
  const Drawer = createDrawerNavigator();
  const [notes, setNotes] = useState<Array<Note>>([])
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NotesList" options={{ headerShown: false }}>
            {props => <NotesList {...props} notes={notes} />}
          </Stack.Screen>
          <Stack.Screen name="Editor" options={{ headerShown: false }}>
            {props => <Editor {...props} setNotes={setNotes} notes={notes}/>}
          </Stack.Screen>
        </Stack.Navigator>
        {/* <Editor setNotes={setNotes}/> */}
      </NavigationContainer>
      <StatusBar style='dark'/>
    </PaperProvider>
  );
}
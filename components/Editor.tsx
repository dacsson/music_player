import React, {useState} from 'react';
import {View, ScrollView, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import { Appbar, TextInput, List, Text, Surface, DataTable } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';

interface IEditorProps {
  notes: Array<Note>;
  setNotes: Function;
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>
}

const Editor: React.FunctionComponent<IEditorProps> = (props) => {
  const colors = ["red", "blue", "yellow", "green"]
  const routeHeader = props.route.params === undefined ? "" : props.route.params.routeHeader;
  const routeText = props.route.params === undefined ? "" : props.route.params.routeText;
  const [text, setText] = useState<string>(routeText);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [header, setHeader] = useState<string>(routeHeader);
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const handleCloseEdit = () =>
  {
    setEditMode(false)
    Keyboard.dismiss()
  }

  const handleSaveNote = () =>
  {
    let note : Note = {
      name: header,
      content: text,
      date: new Date(),
      color: colors[Math.floor(Math.random()*3)]
    }

    props.setNotes([
      ...props.notes,
      note
    ])

    props.navigation.navigate('NotesList')
  }

  return (
    <>
      <Appbar.Header >
        <Appbar.BackAction onPress={() => props.navigation.navigate('NotesList')}/>
        <Appbar.Content title="" />
        {
          editMode
          ?
          <Appbar.Action 
            size={20} 
            icon="check" 
            iconColor='black' 
            mode='outlined' 
            style={{ borderRadius: 10, borderColor: "#d3d3d3", marginRight: 20 }} 
            onPress={() => handleCloseEdit()}
          />
          :
          <Appbar.Action 
            size={20} 
            icon="content-save" 
            iconColor='black' 
            mode='outlined' 
            style={{ borderRadius: 10, borderColor: "#d3d3d3", marginRight: 20 }} 
            onPress={() => handleSaveNote()}
          />
        }
      </Appbar.Header>    
      <View style={{justifyContent: 'flex-start', backgroundColor: "#fff"}}>
        {/* Note header */}
        <TextInput
          label=""
          value={header}
          placeholder="Название"
          onChangeText={text => setHeader(text)}
          mode={'flat'}
          underlineColor="transparent"
          textColor='black'
          style={{ width: "100%", backgroundColor: "#fff", fontSize: 25, fontWeight: 'bold'}}
          onTouchStart={() => setEditMode(true)}
        />

        {/* Date */}
        <Text variant="labelMedium" style={{ color: "gray", marginLeft: 15, marginTop: 5 }}>
          {(new Date()).toLocaleString()} | {text.trim().length} символов
        </Text>
        {/* Note content */}
        <ScrollView style={{ flexGrow: 1, marginTop: 15 }}>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}>
            <View style={{ minHeight: windowHeight }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>
                    
                  </DataTable.Title>
                  <DataTable.Title>
                    
                  </DataTable.Title>
                  <DataTable.Title>
                    
                  </DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>
                    1.1
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>
                    Наименование объекта
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <TextInput
                      label=""
                      placeholder='Дорогой дневник...'
                      value={text}
                      onChangeText={text => setText(text)}
                      multiline={true}
                      mode={'flat'}
                      underlineColor="transparent"
                      scrollEnabled={true}
                      textColor='black'
                      style={{ backgroundColor: "#f3f4f6" }}
                      onTouchStart={() => setEditMode(true)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};
export default Editor;
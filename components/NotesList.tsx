import React, {useState} from 'react';
import {View} from 'react-native';
import { useTheme, Appbar, Text, List, Searchbar, FAB, Surface, Divider } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface INListProps {
  notes: Array<Note>;
  navigation: NavigationProp<any, any>;
}

const NotesList : React.FunctionComponent<INListProps> = (props) => {
  //const navigation = useNavigation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <>
      <Appbar.Header style={{ justifyContent: 'center', backgroundColor: "#f9f9f9" }}>
        <Searchbar
          placeholder="Поиск"
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
          style={{ 
            width: "90%", 
            borderRadius: 10, 
            backgroundColor: "#fff", 
            borderColor: "#d3d3d3", 
            borderWidth: 1,
            height: 48
          }}
          inputStyle={{
            marginTop: -5
          }}
        />
      </Appbar.Header>
      <View style={{flexGrow: 1 , justifyContent: 'flex-start', alignItems: 'center', backgroundColor: "#f9f9f9"}}>
        {
          props.notes.length === 0
          &&
          <Text variant="bodyLarge" style={{ color: "gray", marginLeft: 15, marginTop: 20}}>
            У вас нет ни одного документа
          </Text>
        }
        {
          props.notes.map((note : Note) => {
            return (
              <Surface 
                key={note.name}  
                elevation={1} 
                style={{ 
                  marginTop: 10, 
                  borderRadius: 10, 
                  width: "90%",
                  borderLeftColor: note.color,
                  borderLeftWidth: 5
                }}
              >
                <List.Item
                  //left={(props) => <List.Icon {...props} style={{ height: 8, marginLeft: 10 }} icon='square'/>}
                  right={(props) => 
                    <>
                      <Text style={{ color: "gray", fontSize: 12 }}>
                        {note.date.toLocaleString().slice(0, 10)}
                      </Text>
                    </>
                  }
                  title={note.name}
                  titleStyle={{ fontSize: 17 }}
                  description={note.content.slice(0, 40) + "..."}
                  descriptionStyle={{ fontSize: 14, marginTop: 8 }}
                  style={{ 
                    borderRadius: 10, 
                    backgroundColor: "#fff"
                  }}
                  onPress={() => props.navigation.navigate('Editor', {routeHeader: note.name, routeText: note.content})}
                />
              </Surface>
            )
          })
        }
      </View>
      <FAB
        icon="plus"
        color='white'
        mode='flat'
        style={{
          position: "absolute",
          right: 30,
          bottom: 30,
          backgroundColor: "orange",
        }}
        onPress={() => props.navigation.navigate('Editor')}
      />
    </>
  );
};
export default NotesList;
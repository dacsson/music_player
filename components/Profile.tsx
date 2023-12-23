import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {FAB, Portal, Title, List} from 'react-native-paper';
import base from '../styles/base';
import { useTheme } from 'react-native-paper';

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const theme = useTheme();

  return (
    <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
      <List.Item
        left={(props) => <List.Icon {...props} icon='book-music' />}
        title='Моя музыка'
        description='Библиотека вашей сохранённой музыки'
        style={{width: '100%'}}
        onPress={() => {}}
      />
      <List.Item
        left={(props) => <List.Icon {...props} icon='robot-happy' />}
        title='По настроению'
        description='Подберём для вас музыку по настроению'
        style={{width: '100%'}}
        onPress={() => {}}
      />
      <List.Item
        left={(props) => <List.Icon {...props} icon='music-box' />}
        title='По жанрам'
        description='Подберём для вас музыку по жанрам'
        style={{width: '100%'}}
        onPress={() => {}}
      />
    </View>
  );
};
export default Profile;
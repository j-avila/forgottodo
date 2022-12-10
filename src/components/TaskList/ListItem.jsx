import React from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Trash from '../../assets/img/trash.svg';

const ListItem = ({ task, handleChange, handleDelete }) => {
  return (
    <TouchableHighlight key={task.item.id}>
      <View style={styles.listItem}>
        <View style={styles.listItem.sub}>
          <CheckBox
            value={task.item.done}
            onValueChange={(value) => {
              handleChange(task.item.id, value);
            }}
          />
          <Text style={styles.listItem.text}>{task.item.name}</Text>
        </View>
        <Trash
          width={20}
          height={20}
          fill="#f34848"
          onPress={() => handleDelete(task.item.id)}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    background: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    sub: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      paddingLeft: 20,
    },
  },
});

export default ListItem;

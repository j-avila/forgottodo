import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from './ListItem';

const TaskList = ({ selected, data, clickHandler, handleDelete }) => {
  return (
    <View style={styles.container}>
      <Text>Tareas para hoy {selected ? String(selected) : ''}</Text>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    background: '#ffff',
  },
  listItem: {
    paddingVertical: 20,
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

import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Backdrop } from 'react-native-backdrop';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import ListItem from '../../components/TaskList/ListItem';

import AddButton from '../../assets/img/add.svg';
import Send from '../../assets/img/send.svg';
import NotFound from '../../assets/img/notfound.svg';
import theme from '../../theme';

const HomePage = () => {
  const [dateList, setDateList] = useState();
  const [selected, setSelected] = useState(dayjs().format('DD/MM/YYYY'));
  const [dayTasks, setDayTasks] = useState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState();
  const dates = [
    {
      dateId: '28/11/2022',
      tasks: [
        { id: 1, name: 'bañar al perrito 🐕', done: false },
        { id: 2, name: 'pasear al perrito 🐕', done: true },
      ],
    },
    {
      dateId: '29/11/2022',
      tasks: [
        { id: 1, name: 'codear un rato 🧑🏽‍💻', done: false },
        { id: 2, name: 'leer un libro  📖', done: false },
      ],
    },
  ];

  const setDay = (id) => {
    const daySelected = dateList?.find((day) => {
      return day.dateId === id;
    });
    setDayTasks(daySelected?.tasks);
  };

  const handleChange = (itemId, status) => {
    const newState = dateList.map((date) => {
      console.log(selected);
      if (date.dateId === selected) {
        date.tasks.forEach((task) => {
          if (task.id === itemId) {
            task.done = status;
            return task;
          }
          return task;
        });
      }

      return date;
    });
    console.log('state', newState);
    setDateList(newState);
  };

  const handleDelete = (id) => {
    const newState = dateList.map((date) => {
      if (date.dateId === selected) {
        return {
          ...date,
          tasks: date.tasks.filter((task) => task.id !== id),
        };
      }

      return date;
    });
    setDateList(newState);
  };

  const handleCreate = (name) => {
    const currentDay = dateList
      .map((day) => day.dateId)
      .find((day) => day === selected);
    const newItem = { id: Date.now(), name, done: false };
    const editedItem = dateList.map((date) => {
      if (date.dateId === selected) {
        return {
          ...date,
          tasks: [...date.tasks, newItem],
        };
      }

      return date;
    });

    const newDay = [
      ...dateList,
      {
        dateId: selected,
        tasks: [newItem],
      },
    ];

    setDateList(currentDay ? editedItem : newDay);
    setForm(undefined);
    setOpen(false);
  };

  const handleSelected = (day) => {
    setSelected(day);
    setDay(day);
  };

  useEffect(() => {
    setDateList(dates);
  }, []);

  useEffect(() => {
    setDay(selected);
  }, [dateList]);

  return (
    <SafeAreaView style={{ flex: 100 }}>
      <ReactNativeCalendarStrip
        startingDate={dayjs()}
        onDateSelected={(e) => handleSelected(dayjs(e).format('DD/MM/YYYY'))}
        highlightDateNumberStyle={{ color: 'white' }}
        highlightDateNameStyle={{ color: 'white' }}
        highlightDateContainerStyle={{
          backgroundColor: theme.colors.accent,
          padding: 5,
          borderRadius: 50,
        }}
        dateNumberStyle={{ color: 'darkgray' }}
        dateNameStyle={{ color: 'darkgray' }}
        style={{ backgroundColor: 'papayawhip', height: 100, padding: 10 }}
      />
      {dayTasks?.length >= 1 ? (
        <View style={styles.list}>
          <Text style={styles.list.title}>
            Tareas para hoy {selected ? String(selected) : ''}
          </Text>
          <FlatList
            data={dayTasks}
            extraData={dateList}
            renderItem={(task) => (
              <ListItem
                task={task}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            )}
            previewOpenDelay={3000}
            scrollEnabled={false}
          />
        </View>
      ) : (
        <View style={styles.notFound}>
          <Text style={styles.notFound.text}>No hay nada para hoy</Text>
          <NotFound width={420} height={220} />
          <Text>agrega alguna para comenzar el día!</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => {
          setOpen(!open);
        }}
      >
        <AddButton
          fill="papayawhip"
          width={30}
          height={30}
          style={styles.floatButton.icon}
        />
      </TouchableOpacity>
      <Backdrop
        visible={open}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        handleClose={() => {
          setOpen(false);
        }}
        backdropStyle={{
          backgroundColor: '#fff',
        }}
      >
        <View style={styles.form}>
          <Text style={styles.form.title}>Que debes hacer?</Text>
          <TextInput
            value={form}
            style={styles.form.input}
            onChangeText={(e) => setForm(e)}
            placeholder="Ordenar la ropa"
          />
          <TouchableHighlight
            style={styles.form.sendButton}
            onPress={() => handleCreate(form)}
          >
            <>
              <Text>Crear tarea</Text>
              <Send width={18} height={18} fill="white" />
            </>
          </TouchableHighlight>
        </View>
      </Backdrop>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
    title: {
      fontSize: 17,
      paddingLeft: 12,
      color: 'lightgray',
    },
  },
  floatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    bottom: 10,
    right: 10,
    icon: {
      marginVertical: 15,
      marginHorizontal: 15,
    },
  },
  form: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    height: 300,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    input: {
      width: 300,
      borderColor: 'black',
      borderRadius: 20,
      backgroundColor: '#dbdbdb',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    sendButton: {
      width: 180,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 30,
      backgroundColor: 'papayawhip',
    },
    title: {
      color: 'black',
      fontSize: 20,
      fontweight: 900,
      textTransform: 'uppercase',
    },
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    text: {
      fontSize: 22,
      fontweight: 900,
      marginBottom: 20,
    },
  },
});

export default HomePage;

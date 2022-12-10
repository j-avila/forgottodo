import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import theme from '../../theme';
import Logo from '../../assets/img/forgottodo.svg';

const Header = () => {
  return (
    <View style={styles.head}>
      <Text>{dayjs().format('dddd, MMM, YYYY')}</Text>
      <View style={styles.logo}>
        <Logo width={35} height={35} />
        <Text style={styles.title}>ForgotTodo</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  head: {
    paddingTop: 25,
    paddingBottom: 40,
    paddingLeft: 20,
    color: 'darkgray',
    backgroundColor: 'papayawhip',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.head,
    marginLeft: 5,
    fontWeight: '900',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomePage from '../pages/HomePage/HomePage';
import Header from '../components/Header/Header';

const Main = () => {
  return (
    <View style={styles}>
      <Header />
      <HomePage />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  flexGrow: 1,
});

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Button, Divider, Flex } from "@react-native-material/core";

import { signOut } from '../api/firebase/auth.firebase';

export default function Settings({ navigation: { navigate }}: { navigation: { navigate: any}}) {
  const handleLogout = () => {
    signOut();
    navigate('Login')
  }

  return (
    <ScrollView style={styles.container}>
      <Flex style={styles.section}>
        <Text style={styles.sectionHeader}> Account info</Text>
        <Text style={[styles.sectionRow, styles.top]}>Name</Text>
        <Divider />
        <Text style={styles.sectionRow}>Email</Text>
        <Divider />
        <Text style={styles.sectionRow}>Phone</Text>
        <Divider />
        <Text style={styles.sectionRow}>Age</Text>
      </Flex>
      <Flex style={styles.section}>
        <Text style={styles.sectionHeader}>About me</Text>
        <Text style={[styles.sectionRow, styles.top]}>Name</Text>
        <Divider />
        <Text style={styles.sectionRow}>Email</Text>
        <Divider />
        <Text style={styles.sectionRow}>Phone</Text>
        <Divider />
        <Text style={styles.sectionRow}>Age</Text>
      </Flex>
      <Button style={styles.logoutButton} title="Logout" onPress={handleLogout} />
      {/* <EditScreenInfo path="/screens/Settings.tsx" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F2F1F7',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  section: {
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'black'
    borderRadius: 6,
    padding: 20,
    marginBottom: 20
  },
  sectionHeader: {
    fontSize: 18,
    paddingBottom: 10
  },
  sectionRow: {
    // borderWidth: 1,
    // borderColor: 'pink'
    paddingTop: 10,
    paddingBottom: 10
  },
  top: {
    paddingTop: 15
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
  logoutButton: {
    marginTop: 15,
    marginRight: 10
  },
});

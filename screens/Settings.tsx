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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F2F1F7',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
    marginBottom: 20
  },
  sectionHeader: {
    fontSize: 18,
    paddingBottom: 10
  },
  sectionRow: {
    paddingTop: 10,
    paddingBottom: 10
  },
  top: {
    paddingTop: 15
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: 'red',
    padding: 5
  },
});

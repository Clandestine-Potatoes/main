import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, View } from '../components/Themed';

import { Button, Flex, Divider } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';

import useAbout from "../api/firebase/hooks/useAbout";
// import { signOut } from '../api/firebase/auth.firebase';

export default function AboutMeEdit({ navigation: { navigate }}: { navigation: { navigate: any}}) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [identity, setIdentity] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  // const handleLogout = () => {
  //   signOut();
  //   navigate('Login')
  // }

  const [trigger] = useAbout();

  function handleSubmit() {
    trigger({
      name: `${firstName} ${lastName}`,
      age,
      identity,
      bio
    });
    navigate('Root')
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.aboutMeHeader}>Tell us about yourself</Text>
          <Divider />
          <Flex style={styles.rowWrapper}>
            <TextInput activeOutlineColor='#0089E3' label="First name" mode='outlined' style={[styles.input, styles.nameInput]} autoComplete onChangeText={(value) => setFirstName(value)}/>
            <TextInput activeOutlineColor='#0089E3' label="Last name" mode='outlined' style={[styles.input, styles.nameInput]} autoComplete onChangeText={(value) => setLastName(value)}/>
          </Flex>
          <TextInput activeOutlineColor='#0089E3' label="Age" mode='outlined' style={styles.input} autoComplete keyboardType='number-pad' onChangeText={(value) => setAge(parseInt(value))}/>
          <TextInput activeOutlineColor='#0089E3' label="I identify as" mode='outlined' style={styles.input} autoComplete onChangeText={(value) => setIdentity(value)} />
          <TextInput activeOutlineColor='#0089E3' label="Bio" mode='outlined' style={styles.input} autoComplete multiline={true} numberOfLines={3} onChangeText={(value) => setBio(value)} />
          <Button style={styles.nextButton} title="Submit" onPress={handleSubmit}/>
          {/* <Button style={styles.logoutButton} title="Logout" onPress={handleLogout} /> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 45
  },
  input: {
    marginTop: 15,
    marginRight: 10,
  },
  nameInput: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  warning: {
    color: 'red',
    paddingTop: 5
  },
  nextButton: {
    marginTop: 15,
    backgroundColor: '#0089E3',
    marginRight: 10
  },
  logoutButton: {
    marginTop: 15,
    marginRight: 10
  },
  aboutMeHeader: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  rowWrapper: {
    flexDirection: 'row',
  }
});

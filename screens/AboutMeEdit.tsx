import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, View } from '../components/Themed';

import { Button, Flex, Divider } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';

export default function AboutMeEdit() {

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.aboutMeHeader}>Tell us about yourself</Text>
          <Divider />
          <Flex style={styles.rowWrapper}>
            <TextInput activeOutlineColor='#0089E3' label="First name" mode='outlined' style={[styles.input, styles.nameInput]} autoComplete />
            <TextInput activeOutlineColor='#0089E3' label="Last name" mode='outlined' style={[styles.input, styles.nameInput]} autoComplete/>
          </Flex>
          <TextInput activeOutlineColor='#0089E3' label="Age" mode='outlined' style={styles.input} autoComplete keyboardType='number-pad' />
          <TextInput activeOutlineColor='#0089E3' label="I identify as" mode='outlined' style={styles.input} autoComplete />
          <TextInput activeOutlineColor='#0089E3' label="Bio" mode='outlined' style={styles.input} autoComplete multiline={true} numberOfLines={3}/>
          <Button style={styles.nextButton} title="Next" onPress={() => {}}/>
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
  aboutMeHeader: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  rowWrapper: {
    flexDirection: 'row',
    
  }
});

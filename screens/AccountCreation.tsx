import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, View } from '../components/Themed';

import { Button, Divider } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";


export default function AccountCreation() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.accountCreationHeader}>Create an account</Text>
          <Divider />
          <Controller control={control} rules={{required: true}} render={({ field: { onChange, onBlur, value } }) => (
            <TextInput activeOutlineColor='#0089E3' label="Email" mode='outlined' style={styles.input} autoComplete onChangeText={onChange}/>
          )}
          name='email'
          />
          {errors.email && <Text style={styles.warning}>Email is required.</Text>}
          <Controller control={control} rules={{required: true}} render={({ field: { onChange, onBlur, value } }) => (
            <TextInput activeOutlineColor='#0089E3' label="Password" mode='outlined' style={styles.input} autoComplete onChangeText={onChange} secureTextEntry />
          )}
          name='password'
          />
          {errors.password && <Text style={styles.warning}>Password is required.</Text>}
          <Button style={styles.createAccountButton} title="Submit" onPress={handleSubmit(onSubmit)}/>
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
    marginTop: 15
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
  createAccountButton: {
    marginTop: 15,
    backgroundColor: '#0089E3'
  },
  accountCreationHeader: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5
  }
});

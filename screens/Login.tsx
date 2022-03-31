import { Keyboard, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useState } from 'react';

import { Text, View } from '../components/Themed';

import { Button, Flex, Pressable } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';

export default function Login() {
  const [password, setPassword] = useState<string>('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./../assets/images/potato.png')} />
        <TextInput activeOutlineColor='#0089E3' label="Email" mode='outlined' style={styles.input} autoComplete/>
        <TextInput activeOutlineColor='#0089E3' label="Password" mode='outlined' style={styles.input} autoComplete onChangeText={(value) => setPassword(() => value)}/>
        <Pressable style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
        </Pressable>
        <Button title="Log In" color="#0089E3" titleStyle={styles.loginButtonText} pressableContainerStyle={styles.loginButton} disabled={!password.length}/>
        <Flex style={styles.signUpContainer}>
          <Text>Don't have an account?</Text>
          <Pressable>
            <Text style={styles.signUpLink}>{' '}Sign up here.</Text>
          </Pressable>
        </Flex>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 45
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  input: {
    marginTop: 20
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  signUpLink: {
    color: '#0089E3'
  },
  loginButton: {
    padding: 5
  },
  loginButtonText: {
    color: 'white',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotPasswordLink: {
    color: '#0089E3',
    fontWeight: '700'
  }
});
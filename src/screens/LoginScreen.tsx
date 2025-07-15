import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* ------------------------------------------------------------------ */
/* 🔑 Navigation route definitions                                    */
/* ------------------------------------------------------------------ */
type RootStackParamList = {
  Login: undefined;
  Map: undefined;          // adjust if Map takes params
  /* other screens … */
};

/* ------------------------------------------------------------------ */
/* 🛡 Read-only props (S6759 compliant)                                */
/* ------------------------------------------------------------------ */
type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, 'Login'>
>;

/* ------------------------------------------------------------------ */
/* 🚀 Component                                                       */
/* ------------------------------------------------------------------ */
export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (): void => {
    if (email && password) {
      // TODO: add real validation / API call
      navigation.navigate('Map');
    } else {
      Alert.alert('Missing Fields', 'Please enter email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to InContext</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 Styles                                                          */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

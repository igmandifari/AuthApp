import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secure, setSecure] = useState(true);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const result = await login({ email, password });

    if (result) {
      Alert.alert('Login Failed', result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordBox}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={secure}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Text>{secure ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  passwordBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '600',
  },
});
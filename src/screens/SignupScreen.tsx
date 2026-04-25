import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const SignupScreen = ({ navigation }: any) => {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const onSignup = async () => {
    setError('');
  
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
  
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
  
    if (password.length < 6) {
      setError('Password minimum 6 characters.');
      return;
    }
  
    setLoading(true);
  
    const result = await signup({
      name,
      email,
      password,
    });
  
    if (result) {
      setError(result);
    }
  
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Text>{secure ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onSignup}
        disabled={loading}>
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>Signup</Text>
        )}
    </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

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
  error: {
    color: '#e53935',
    marginBottom: 14,
    fontSize: 13,
  },
});
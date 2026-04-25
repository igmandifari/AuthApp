import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogin = async () => {
    setError('');
  
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
  
    if (!password) {
      setError('Password is required.');
      return;
    }
  
    setLoading(true);
  
    const result = await login({ email, password });
  
    if (result) {
      setError(result);
    }
  
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Login to continue your account
        </Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.passwordInput}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Text style={styles.eye}>
              {secure ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={onLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>
            Don't have account? Signup
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  logo: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: 6,
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 15,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
  },
  eye: {
    fontSize: 18,
  },
  error: {
    color: '#e53935',
    marginBottom: 14,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 14,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
  link: {
    marginTop: 18,
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '600',
  },
});
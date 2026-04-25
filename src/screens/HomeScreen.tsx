import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
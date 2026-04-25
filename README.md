# AuthApp

A React Native Authentication App built using **React Native CLI**, **TypeScript**, **React Context API**, **React Navigation**, and **AsyncStorage**.

This project was created as an assignment to demonstrate authentication flow, state management, navigation handling, and clean UI implementation.

---

# Features

## Authentication Flow

* User Signup
* User Login
* Logout functionality
* Persist login session using AsyncStorage
* Auto redirect based on login status

## Screens

* Login Screen
* Signup Screen
* Home Screen

## UI / UX

* Clean modern interface
* Password show / hide toggle
* Loading state on login
* Inline validation messages
* Responsive layout

---

# Tech Stack

* React Native CLI
* TypeScript
* React Context API
* React Navigation
* AsyncStorage
* React Hooks

---

# Project Structure

```bash
src/
├── components/
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── navigation/
│   └── RootNavigator.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── HomeScreen.tsx
└── App.tsx
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd AuthApp
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Android

```bash
npx react-native run-android
```

## 4. Run iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

---

# Demo Flow

## Signup

Create new account using:

* Full Name
* Email
* Password

## Login

Login using registered account credentials.

## Home

Displays:

* User Name
* User Email

Logout button returns user to Login screen.

---

# Storage

User authentication session is stored locally using AsyncStorage so users remain logged in after app restart.

---

# Improvements (Future Scope)

* API integration
* Secure token storage
* Dark mode
* Forgot password
* Unit testing
* Biometric login

---

# Author

Developed by Igman Difari

---

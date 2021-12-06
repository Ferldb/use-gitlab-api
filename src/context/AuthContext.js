import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import * as RootNavigation from '../../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        signedIn: true,
        access_token: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "signOut":
      return {
        ...state,
        signedIn: false,
        access_token: null,
      };
    default:
      return { ...state };
  }
}

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    signedIn: false,
    access_token: null,
    error: "",
  });

  const tryLocalSignIn = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
      dispatch({ type: 'signIn', payload: access_token });
      RootNavigation.navigate('Feed');
    }
    else {
      dispatch({ type: 'signOut' });
      RootNavigation.navigate('Sign in');
    }

  }

  const signIn = async ({ username, password }) => {
    try {
      const response = await axios({
        method: "post",
        url: "https://gitlab.com/oauth/token",
        data: {
          grant_type: "password",
          username,
          password,
        },
      });
      await AsyncStorage.setItem('access_token', response.data.access_token);
      dispatch({ type: "signIn", payload: response.data.access_token });
      RootNavigation.navigate("Feed");
    } catch (err) {
      dispatch({
        type: "error",
        payload: "Problemas para autenticar usuário.",
      });
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('access_token'); 
    dispatch({ type: 'signOut' });
    RootNavigation.navigate('Sign in');
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        tryLocalSignIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

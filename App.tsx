//import React, { useState } from "react";
//import { View } from "react-native";
import React from "react";
//import LoginScreen from "./src/screens/LoginScreen";
//import RegisterScreen from "./src/screens/RegisterScreen";
//import ProductsScreen from "./src/screens/ProductScreen";
//import AndroidDemoScreen from './src/screens/M4AndroidDemoScreen';
//import ProductApiScreen from "./src/screens/ProductApiScreen";
//import Crud from "./src/screens/Crud";
import Table from "./src/screens/Table";


//*************NAVIGATION**********************/
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack
//npm install @react-navigation/bottom-tabs
//npm install @react-navigation/drawer


export default function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // if (!loggedIn) {
  //   return (
  //     <View>
  //       <RegisterScreen />
  //       <LoginScreen onLogin={() => setLoggedIn(true)} />
  //     </View>
  //   );
  // }

    return <Table />;
}

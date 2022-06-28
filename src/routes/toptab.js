import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AtualizarDados from '../pages/Admin/AtualizarDados';
import CriarLoja from '../pages/Admin';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle:{
        backgroundColor: '#b22',

      },
      tabBarActiveTintColor: '#fff',
      tabBarIndicatorStyle: {
        backgroundColor: '#fff'
      }
    }}
    >
      <Tab.Screen
      name="CriarLoja"
      component={CriarLoja}      
      options={{
        title: 'Criar Loja'

      }}/>

      <Tab.Screen
      name="AtualizarDados"
      component={AtualizarDados} 
      options={{
        title: 'Atualizar Dados'

      }}/>
    </Tab.Navigator>
  );
}
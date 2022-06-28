import React, {useContext} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Produtos from '../../src/pages/Loja/produtos'
import Add from '../../src/pages/Loja/add'
import Edicao from '../../src/pages/Loja/edicao'
import Dados from '../../src/pages/Loja/dados'
import SignIn from '../../src/pages/SignIn'

import Toptab from '../routes/toptab'
import { AuthContexto } from '../contextos/auth'

const AppStack = createNativeStackNavigator()

export default function AppRoutes() {

  const { deslogar } = useContext(AuthContexto)

  return (

    <AppStack.Navigator
      initialRouteName='SignIn'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#b22',
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Bold',
        },
      }}>

      <AppStack.Screen
        name='Admin'
        component={Toptab}
        options={{
          title: 'Guia Admin',
          headerShadowVisible: false,
          headerRight: ()=> {
            return (
              <TouchableOpacity
                onPress={deslogar}
              >
    
                <Text style={{color: '#fff'}}>Sair</Text>
              </TouchableOpacity>
            )
          }
        }} />

      <AppStack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false,
        }} />

      <AppStack.Screen
        name='Produtos'
        component={Produtos}
        options={{
          title: 'Minha Loja',
        }}
      />

      <AppStack.Screen
        name='Add'
        component={Add}
        options={{
          title: 'Postar Produtos',
        }}
      />

      <AppStack.Screen
        name='Edicao'
        component={Edicao}
        options={{
          title: 'O que deseja fazer?',
        }}
      />

      <AppStack.Screen
        name='Dados'
        component={Dados}
        options={{
          title: 'Loja',
          headerTitleAlign: 'center',
        }}
      />

    </AppStack.Navigator>

  )
}
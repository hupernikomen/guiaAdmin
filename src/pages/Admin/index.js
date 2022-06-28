import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { ContainerInput, Input, TitleInput, Botao, TextoBotao } from '../styled'
import { AuthContexto } from '../../contextos/auth'

import { useNavigation } from '@react-navigation/native';

export default function Admin() {

  const navigation = useNavigation()
  const { deslogar } = useContext(AuthContexto)
  const { criarLoja } = useContext(AuthContexto)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={deslogar}>
            <Text style={{ color: '#fff' }}>
              Sair
            </Text>
          </TouchableOpacity>
        )
      }
    })
  }, [])

  return (

    <View style={{
      flex: 1,
      paddingVertical: 14
    }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
        }}>

        <View
          style={{
            paddingVertical: 14
          }}>
          <ContainerInput>
            <TitleInput>
              Email
            </TitleInput>
            <Input
              value={email}
              onChangeText={(i) => setEmail(i)}>
            </Input>
          </ContainerInput>

          <ContainerInput>
            <TitleInput>
              Senha
            </TitleInput>
            <Input
              value={senha}
              onChangeText={(i) => setSenha(i)}>
            </Input>
          </ContainerInput>

          <ContainerInput>
            <Botao
              activeOpacity={.9}
              onPress={() => criarLoja(email, senha)}>
              <TextoBotao>
                Criar Loja
              </TextoBotao>
            </Botao>
          </ContainerInput>
        </View>
      </ScrollView>
    </View>
  );
}

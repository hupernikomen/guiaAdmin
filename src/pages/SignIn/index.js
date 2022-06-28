import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';

import { AuthContexto } from '../../contextos/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ContainerInput, InputLogin, TitleInputLogin, Botao, TextoBotao } from '../styled'

export default function SignIn() {

  const { logarUsuario, erro, loading } = useContext(AuthContexto)


  // const [email, setEmail] = useState('')
  // const [senha, setSenha] = useState('')
  // const [email, setEmail] = useState('hupcontato@gmail.com')
  // const [senha, setSenha] = useState('hp422354')
  const [email, setEmail] = useState('teste@teste.com')
  const [senha, setSenha] = useState('123456')
  const [whats, setWhats] = useState('')
  const [formLogin, setFormLogin] = useState(false) // false = Login | true = cadastro
  const [_erro, setErro] = useState('')

  useEffect(() => {
    setErro(erro)
  })

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 14
    }}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true} />
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          color: '#000'
        }}>
        Lojistas
      </Text>
      <Text
        style={{
          fontFamily: 'Roboto-Black',
          textAlign: 'center',
          color: '#000',
          fontSize: 24,
          marginBottom: 40,
        }}>
        Guia Comercial
      </Text>

      <ContainerInput>
        <TitleInputLogin erro={_erro === 'Email não Cadastrado' || _erro === 'Email Invalido' ? '#b22' : '#000'}>
          {_erro === 'Email não Cadastrado'|| _erro === 'Email Invalido' ? _erro : 'Email'}
        </TitleInputLogin>
        <InputLogin erro={_erro === 'Email não Cadastrado' ? '#b22' : '#000'}
          value={email}
          onChangeText={(i) => setEmail(i)}
          placeholderTextColor={'#2229'}>
        </InputLogin>
      </ContainerInput>

      <ContainerInput>
        <TitleInputLogin erro={_erro === 'Senha Incorreta' ? '#b22' : '#000'}>
          {_erro === 'Senha Incorreta' ? _erro : 'Senha'}
        </TitleInputLogin>
        <InputLogin erro={_erro === 'Senha Incorreta' ? '#b22' : '#000'}
          value={senha}
          placeholderTextColor={'#fff9'}
          onChangeText={(i) => setSenha(i)}
          secureTextEntry={true}>
        </InputLogin>
      </ContainerInput>

      <ContainerInput>
        <Botao
          activeOpacity={.9}
          onPress={() => logarUsuario(email, senha)}>
          {loading && <ActivityIndicator color={'#fff'} />}

          <TextoBotao>
          {loading ? 'Acessando...' : 'Acessar'}
          </TextoBotao>
        </Botao>
      </ContainerInput>

      <TouchableOpacity
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55${'86994773403'}`)}
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Roboto-Light',
            marginRight: 8,
          }}>
          Preciso de ajuda
        </Text>
        <Icon name={'whatsapp'} size={16} color={'#000'} />
      </TouchableOpacity>


    </View>

  )
}


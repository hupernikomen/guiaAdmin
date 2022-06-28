import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Switch,ActivityIndicator } from 'react-native';

import { ContainerInput, Input, TitleInput, Botao, TextoBotao, TextoSimples } from '../styled'
import { Picker } from '@react-native-picker/picker';
import { AuthContexto } from '../../contextos/auth'
import firestore from '@react-native-firebase/firestore'

export default function AtualizarDados() {

  const { atualizaLoja, loading } = useContext(AuthContexto)

  const [status, setStatus] = useState(false)
  const [lojasPicker, setLojasPicker] = useState([])
  const [lojaSelecionada, setLojaSelecionada] = useState('')
  const [polo, setPolo] = useState('')
  const [loja, setLoja] = useState([])

  useEffect(() => {

    firestore()
      .collection('lojas')
      .get()
      .then(querySnapshot => {
        const lojas = []

        querySnapshot.forEach(documentSnapshot => {
          lojas.push({ key: documentSnapshot.id, loja: documentSnapshot.data().nome })
        });
        setLojasPicker(lojas)
      });


  }, [])

  useEffect(() => {

    async function ativaDesativaLoja() {
      await firestore()
        .collection('lojas')
        .doc(lojaSelecionada)
        .get()
        .then(querySnapshot => {
          setLoja(querySnapshot?.data())
          setStatus(querySnapshot?.data()?.status);
          setPolo(querySnapshot?.data()?.polo);
        });
    }
    ativaDesativaLoja()
  }, [lojaSelecionada])

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

        <>
          <ContainerInput>
            <Picker
              dropdownIconColor={'#b22'}
              dropdownIconRippleColor={'#b22'}
              selectedValue={lojaSelecionada}
              onValueChange={(itemValue) => {
                setLojaSelecionada(itemValue);
              }}>
              <Picker.Item key={0} label={'Selecione uma Loja'} />
              {lojasPicker.map((item) => {
                return <Picker.Item key={item.key} label={item.loja} value={item.key} />
              })}
            </Picker>
          </ContainerInput>

          <ContainerInput>
            <TitleInput>
              Polo
            </TitleInput>
            <Input
              value={polo}
              onChangeText={(i) => setPolo(i)}>
            </Input>
          </ContainerInput>

          <ContainerInput>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50,
                paddingHorizontal: 14,
              }}>
              <TextInput
                editable={false}
                style={{
                  color: '#000',
                  fontFamily: 'Roboto-Light',
                  fontSize: 12
                }}
                value={'Status'} />
              <Switch
                trackColor={{ false: "#767577", true: "#b22" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(e) => setStatus(e)}
                value={status}
              />
            </View>
          </ContainerInput>

          <View
            style={{
              paddingHorizontal: 30,
              marginBottom: 20
            }}>

            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginBottom: 14
              }} >
              Outras Informações
            </Text>
            <TextoSimples>Nome: {loja?.nome}</TextoSimples>
            <TextoSimples>Endereço: {loja?.endereco}</TextoSimples>
            <TextoSimples>Whatsapp: {loja?.whatsapp}</TextoSimples>
          </View>

          <ContainerInput>
            <Botao
              activeOpacity={.9}
              onPress={() => atualizaLoja(lojaSelecionada, status, polo)}>
              {loading && <ActivityIndicator color={'#fff'} />}
              <TextoBotao>
                {loading ? 'Atualizando...' : 'Atualizar'}
              </TextoBotao>
            </Botao>
          </ContainerInput>
        </>


      </ScrollView>
    </View>
  );
}


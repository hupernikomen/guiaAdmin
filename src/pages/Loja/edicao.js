import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import { ContainerInput, Input, TitleInput } from '../styled'

export default function LojaEdicao() {

  const route = useRoute()
  const navigation = useNavigation()

  const [key, setKey] = useState(null);
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [off, setOff] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tamsSelecionados, setTamSelecionados] = useState('')
  const [categoria, setCategoria] = useState('');

  const [desabilitarBotao, setDesabilitarBotao] = useState(true)

  const ref_produto = firestore().collection('produtos').doc(key)

  useEffect(() => {
    const produto = route.params?.produto

    setNome(produto?.nome),
      setPreco(produto?.preco.toFixed(2) + ''),
      setOff(produto?.off.toFixed(2) + ''),
      setDescricao(produto?.descricao),
      setTamSelecionados(produto?.tamsSelecionados.toString().toUpperCase()),
      setCategoria(produto?.categoria)

    setKey(route.params?.produto?.key);

  }, [route])

  function liberarBotao() {
    setDesabilitarBotao(false)
  }

  // Deleta produto no Cloud do firebase
  async function excluirProduto() {
    await ref_produto.delete()
      .then(() => {
        alert('Excluido')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Produtos' }],
        });
      })
      .catch((error) => console.log('erro: ', error))
  }

  // Atualiza produto no Cloud do firebase
  async function atualizaProduto() {
    const produto = {
      atualizacao: new Date(),
      categoria,
      preco: Number(preco),
      off: Number(off),
      tamsSelecionados: tamsSelecionados.split(','),
      nome,
      descricao,
    }

    await ref_produto.update(produto)
      .then(() => {
        alert('Atualizado')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Produtos' }],
        });
      })
      .catch((error) => console.log('erro: ', error))
  }

  return (

    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
        }}>

        <ContainerInput>
          <TitleInput>
            Produto
          </TitleInput>
          <Input
            multiline={true}
            numberOfLines={3}
            value={nome.trim()}
            onChangeText={(i) => setNome(i)}
            onChange={liberarBotao}
            placeholder='Nome do produto' >
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Preço
          </TitleInput>
          <Input
            keyboardType={'numeric'}
            value={preco}
            onChangeText={(i) => setPreco(i)}
            onChange={liberarBotao}
            placeholder='Preço'>
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Preço de Oferta
          </TitleInput>
          <Input
            keyboardType={'numeric'}
            value={off}
            onChangeText={(i) => setOff(i)}
            onChange={liberarBotao}
            placeholder='Oferta' >
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Faixa de Tamanho
          </TitleInput>
          <Input

            value={tamsSelecionados}
            onChangeText={(t) => setTamSelecionados(t)}
            onChange={liberarBotao}
            placeholder='Ex.: P, M, GG' >
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Descrição
          </TitleInput>
          <Input

            value={descricao}
            onChangeText={(i) => setDescricao(i)}
            placeholder='Descrição'
            multiline={true}
            numberOfLines={5}
            onChange={liberarBotao}
            textAlignVertical={'top'}
          ></Input>
        </ContainerInput>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>

          <TouchableOpacity
            disabled={desabilitarBotao}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginVertical: 20,
              height: 50,
              borderRadius: 30 / 2,
              backgroundColor: desabilitarBotao ? '#ccc' : '#b22',
              elevation: 5
            }}
            onPress={atualizaProduto}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: 19
              }}>
              Atualizar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginVertical: 20,
              height: 50,
              borderRadius: 30 / 2,
              backgroundColor: '#b22',
              elevation: 5
            }}
            onPress={excluirProduto}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: 19
              }}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Picker } from '@react-native-picker/picker';

import { ContainerInput, Input, TitleInput, Botao, TextoBotao } from '../styled'

import { AuthContexto } from '../../contextos/auth'

export default function LojaAdd() {

  const { registrarProduto } = useContext(AuthContexto)

  const [key, setKey] = useState(null)

  const [imagens, setImagens] = useState([])

  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [off, setOff] = useState(0)
  const [descricao, setDescricao] = useState('')
  const [tamsSelecionados, setTamSelecionados] = useState('')
  const [categoria, setCategoria] = useState('');

  const [loading, setLoading] = useState(false)

  async function Camera() {
    const result = await launchCamera({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000
    });
    addImagem(result)
  }

  async function ImageLibrary() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000
    });

    addImagem(result)
  }

  async function addImagem(result) {
    const imagem = await fetch(result.assets[0].uri);
    const url = await imagem.blob();

    let imgLink = {
      amostra: result.assets[0].uri,
      url: url
    }
    setImagens([...imagens, imgLink])
  }

  return (

    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
        }}>

        {/* ---------------container Fotos----------------- */}

        <View style={{
          marginBottom: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15
        }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20
            }}>

            <TouchableOpacity
              disabled={imagens.length <= 2 ? false : true}
              style={{ marginRight: 15 }}
              onPress={() => ImageLibrary()}>
              <Icon name={'image'} size={36} color={imagens.length <= 2 ? '#b22' : '#eee'} />

            </TouchableOpacity>
            <TouchableOpacity
              disabled={imagens.length <= 2 ? false : true}
              onPress={() => Camera()}>
              <Icon name={'camera'} size={36} color={imagens.length <= 2 ? '#b22' : '#eee'} />

            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            {
              imagens.map((item, key) => (
                <Image
                  key={key}
                  resizeMode='cover'
                  source={{ uri: item.amostra }}
                  style={{ width: 40, height: 40, borderRadius: 5, marginHorizontal: 2 }}
                />
              ))
            }
          </View>
        </View>

        <ContainerInput>
          <TitleInput>
            Nome do Produto
          </TitleInput>
          <Input
            value={nome}
            onChangeText={(i) => setNome(i)}
            placeholder='Item, marca, cor, etc...' >
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
            placeholder='R$' >
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Faixa de Tamanho - Separe por virgula
          </TitleInput>
          <Input
            value={tamsSelecionados}
            onChangeText={(t) => setTamSelecionados(t)}
            placeholder='P, M, GG' >
          </Input>
        </ContainerInput>

        <ContainerInput>
          <TitleInput>
            Descrição
          </TitleInput>
          <Input
            value={descricao}
            onChangeText={(i) => setDescricao(i)}
            placeholder='Informe sobre seu produto'
            numberOfLines={0}
            multiline={true}>
          </Input>
        </ContainerInput>

        <Picker
          dropdownIconColor={'#b22'}
          dropdownIconRippleColor={'#b22'}
          selectedValue={categoria}
          onValueChange={(itemValue, itemIndex) => {
            setCategoria(itemValue)
          }}>
          {['Moda', 'Moveis'].map((item, index) => {
            return <Picker.Item key={index} fontFamily='Roboto-Light' label={item} value={item} />
          })}
        </Picker>

        <ContainerInput>
          <Botao
            activeOpacity={.9}
            onPress={() => registrarProduto(key, imagens, nome, preco, off, descricao, tamsSelecionados, categoria)}>
            {loading && <ActivityIndicator color={'#fff'} />}

            <TextoBotao>
              {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
            </TextoBotao>
          </Botao>
        </ContainerInput>

      </ScrollView>
    </View>
  );
}

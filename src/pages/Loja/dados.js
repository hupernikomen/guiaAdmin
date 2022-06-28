import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import firestore from '@react-native-firebase/firestore'
import { AuthContexto } from '../../contextos/auth'

import { ContainerInput, Input, TitleInput, Botao } from '../styled'

import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DadosLoja() {
   const { user: USER } = useContext(AuthContexto)
   const [loja, setLoja] = useState([])

   const [status, setStatus] = useState(true)
   const [nome, setNome] = useState(null)
   const [endereco, setEndereco] = useState(null)
   const [entrega, setEntrega] = useState(false)
   const [whatsapp, setWhatsapp] = useState(null)
   const [parcelas, setParcelas] = useState(null)
   const [vminimo, setVminimo] = useState(null)
   const [polo, setPolo] = useState(null)
   const [email, setEmail] = useState(null)

   const [loading, setLoading] = useState(false)
   const isFocused = useIsFocused()
   const navigation = useNavigation()
   const [desabilitarBotao, setDesabilitarBotao] = useState(true)
   const [textBotao, setTextBotao] = useState('Atualizar Dados')

   useEffect(() => {
      pegaLoja()
   }, [isFocused])

   useEffect(() => {
      navigation.setOptions({
         title: '',
         headerRight: () => {
            return (
               <View
                  style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <Icon name='circle' size={16} color={status ? '#00ff00' : 'black'} />

                  <Text
                     style={{
                        color: '#f7d4d4',
                        fontSize: 15,
                        marginLeft: 8
                     }}>
                     {status ? 'Loja Ativa' : 'Loja Desativada'}
                  </Text>
               </View>
            )
         }
      })
   })

   function liberarBotao() {
      setTextBotao('Atualizar Dados')
      setDesabilitarBotao(false)
   }

   async function pegaLoja() {
      return (
         await firestore()
            .collection("lojas")
            .doc(USER.user.uid)
            .get()
            .then((querySnapshot) => {
               console.log(querySnapshot.data());
               setLoja(querySnapshot.data())
               setStatus(querySnapshot.data().status)
               setEntrega(querySnapshot.data().entrega)
               setNome(querySnapshot.data().nome)
               setEndereco(querySnapshot.data().endereco)
               setWhatsapp(querySnapshot.data().whatsapp)
               setParcelas(querySnapshot.data().credito.parcelas)
               setPolo(querySnapshot.data().polo)
               setVminimo(querySnapshot.data().credito.vminimo)
               setEmail(querySnapshot.data().credito.email)
            })
      )
   }

   async function atualizarLoja() {
      setLoading(true)
      const lojaAtualizada = {
         status,
         atualizacao: new Date(),
         nome,
         email: loja?.email,
         polo,
         endereco,
         entrega,
         whatsapp,
         credito: {
            parcelas,
            vminimo
         }
      }
      
      await firestore().collection('lojas').doc(USER.user.uid).set(lojaAtualizada)
         .then(() => {
            console.log('Atualizado')
            setLoading(false)
            pegaLoja()
         })
         .catch((error) => {
            console.log('erro: ', error)
            setLoading(false)
         })

      setTextBotao('Informações Atualizadas')
      setDesabilitarBotao(true)
   }

   return (
      <ScrollView>
         <View
            style={{
               paddingVertical: 20
            }}>

            <ContainerInput>
               <TitleInput>
                  Nome da Loja
               </TitleInput>
               <Input
                  onChangeText={(t) => setNome(t)}
                  placeholder={loja?.nome}
                  onChange={liberarBotao}
                  value={nome}>
               </Input>
            </ContainerInput>

            <ContainerInput>
               <TitleInput>
                  Endereço
               </TitleInput>
               <Input
                  onChangeText={(t) => setEndereco(t)}
                  placeholder={loja?.endereco}
                  value={endereco}
                  onChange={liberarBotao}>

               </Input>
            </ContainerInput>

            <ContainerInput>
               <TitleInput>
                  Whatsapp
               </TitleInput>
               <Input
                  onChangeText={(t) => setWhatsapp(t)}
                  placeholder={loja?.whatsapp}
                  value={whatsapp}
                  onChange={liberarBotao}>
               </Input>
            </ContainerInput>

            <ContainerInput>
               <TitleInput>
                  Numero de Parcelas Sem Juros
               </TitleInput>
               <Input
                  onChangeText={(t) => setParcelas(t)}
                  value={parcelas}
                  onChange={liberarBotao}>
               </Input>
            </ContainerInput>

            <ContainerInput>
               <TitleInput>
                  Valor Minimo da Partcela
               </TitleInput>
               <Input
                  onChangeText={(t) => setVminimo(t)}
                  value={vminimo}
                  onChange={liberarBotao}>
               </Input>
            </ContainerInput>

            <View
               style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 50,
                  paddingHorizontal: 14
               }}>
               <TextInput
                  editable={false}
                  style={{
                     color: '#000',
                     fontFamily: 'Roboto-Light',
                     height: 50,
                  }}
                  value={'Faço Entregas?'} />
               <Switch
                  trackColor={{ false: "#767577", true: "#b22" }}
                  thumbColor={"#f4f3f4"}
                  onValueChange={(e) => setEntrega(e)}
                  value={entrega}
                  onChange={liberarBotao}
               />
            </View>
         </View>

         <ContainerInput>
            <Botao
               disabled={desabilitarBotao}
               onPress={atualizarLoja}
               activeOpacity={.7}>
               {loading && <ActivityIndicator style={{ marginRight: 10 }} color={'#fff'} />}
               <Text
                  style={{
                     fontFamily: 'Roboto-Medium',
                     color: '#fff',
                     fontSize: 16,
                  }}>
                  {textBotao}
               </Text>
            </Botao>
         </ContainerInput>
      </ScrollView>
   );
};
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, TouchableOpacity, View, Text, Modal, StyleSheet, Pressable } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import EditProduto from '../../componentes/Produtos';

import { AuthContexto } from '../../contextos/auth'
export default function MeusProdutos() {

   const { user, deslogar } = useContext(AuthContexto)

   const navigation = useNavigation()
   const [item, setItem] = useState([])
   const [menuVisivel, setMenuVisivel] = useState(false)

   const menu = [
      {
         nome: 'Informações da Loja',
         link: 'Dados'
      },
      {
         nome: 'Cadastrar Produtos',
         link: 'Add'
      },
      {
         nome: 'Sair',
         link: 'deslogar'
      },
   ]

   useEffect(() => {
      pegaFeed()
   }, []);


   useEffect(() => {
      navigation.setOptions({
         headerRight: () => {
            return (
               <TouchableOpacity
                  onPress={() => setMenuVisivel(!menuVisivel)}>
                  <Icon name={'dots-vertical'} size={26} color={menuVisivel ? '#b22' : '#fff'} />
               </TouchableOpacity>
            )
         }
      })
   }, [menuVisivel])

   function pegaFeed() {
      firestore()
         .collection("produtos")
         .where('lojaId', '==', user.user.uid)
         .onSnapshot((snapshot) => {
            const feed = [];
            snapshot.forEach(item => {
               feed.push({
                  ...item.data(),
                  key: item.id,
               });
            });
            setItem(feed);
         })
   }

   const Menu = () => {
      return (

         <View style={{
            right: 8,
            top: 52,
         }}>
            <Modal

               animationType="fade"
               transparent={true}
               visible={menuVisivel}>
               <View style={{
                  right: 8,
                  top: 52,
                  position: 'absolute',
                  width: 200,
               }}>
                  <View style={{
                     backgroundColor: "#fff",
                     borderRadius: 4,
                     elevation: 5
                  }}>

                     {menu.map((submenu, index) => {
                        return (
                           <TouchableOpacity
                              key={index}
                              onPress={() => {
                                 setMenuVisivel(!menuVisivel)
                                 submenu.link !== 'deslogar' ? navigation.navigate(submenu.link) : deslogar()
                              }}
                              style={{
                                 height: 50,
                                 justifyContent: 'center',
                              }}>
                              <Text
                                 style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 15,
                                    color: '#000',
                                    marginLeft: 20
                                 }}>
                                 {submenu.nome}
                              </Text>
                           </TouchableOpacity>
                        )
                     })
                     }

                     <TouchableOpacity
                        onPress={() => {
                           setMenuVisivel(!menuVisivel)
                        }}
                        style={{
                           height: 50,
                           justifyContent: 'center',
                           position: 'absolute',
                           right: 8,
                           top: -50
                        }}>
                        <Icon name='close' size={26} color='#fff' />
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>

         </View>

      );
   }

   return (
      <>
         <Menu />
         <FlatList
            contentContainerStyle={{ paddingBottom: 15 }}
            numColumns={2}
            keyExtractor={(item) => item.key}
            data={item}
            renderItem={({ item, index }) => <EditProduto data={item} index={index} />}
            showsVerticalScrollIndicator={false}
         />
      </>
   );
};

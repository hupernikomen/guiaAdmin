import React, { useState, createContext } from 'react';
import { useNavigation } from '@react-navigation/native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export const AuthContexto = createContext({})

export default function AuthProvider({ children }) {

  const navigation = useNavigation()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  async function criarLoja(email, senha) {

    if (email === '' || senha === '') return
    await auth().createUserWithEmailAndPassword(email, senha)
      .then(async (user) => {
        await firestore()
          .collection('lojas')
          .doc(user.user.uid)
          .set({
            whatsapp: '',
            email,
            polo: '',
            endereco: '',
            nome: '',
            entrega: false,
            status: false,
            credito: { parcelas: '', vminimo: '' },
            // loc: {
            //   lat,
            //   lng
            // }
          })
      })
  }


  async function registrarProduto(key, imagens, nome, preco, off, descricao, tamsSelecionados, categoria) {
    setLoading(true)

    const imagensUrl = [null]
    const ref_produto = firestore().collection('produtos').doc(key)
    const ref_loja = firestore().collection('lojas').doc(user.user.uid)
    console.log(ref_loja);

    const produto = {
      criacao: new Date(),
      imagensUrl,
      categoria,
      nome,
      preco: Number(preco),
      off: Number(off),
      descricao,
      tamsSelecionados: tamsSelecionados.split(','),
      lojaId: user.user.uid,
      // lojaStatus: ref_loja.status,
      // lojaPolo: ref_loja.polo
    }

    await ref_produto.set(produto)


    imagens.map(async (foto, index) => {
      var ref = storage().ref(`imagens/produtos/${Math.random()}`);

      await ref.put(foto.url)
        .then(async () => {
          await ref
            .getDownloadURL()
            .then(async (url) => {
              imagensUrl[index] = url
              await ref_produto.update(produto);
            })
        })

        if (index === 0) {
          setLoading(false)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Produtos' }],
          });
          
        }
    })

  }


  async function logarUsuario(email, senha) {
    if (email === '' || senha === '') return
    setLoading(true)

    await auth().signInWithEmailAndPassword(email, senha)
      .then((user) => {
        setLoading(false)
        setUser(user)
        if (user?.user?.email === 'hupcontato@gmail.com') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Admin' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Produtos' }],
          });
        }
        setErro('')
      })
      .catch((error) => {
        setLoading(false)
        error.code === 'auth/invalid-email' && setErro('Email Invalido');
        error.code === 'auth/user-not-found' && setErro('Email não Cadastrado');
        error.code === 'auth/wrong-password' && setErro('Senha Incorreta');
      })
  }

  async function atualizaLoja(lojaSelecionada, status, polo) {
    setLoading(true)
    await firestore()
      .collection('lojas')
      .doc(lojaSelecionada)
      .update({
        status,
        polo
      })
    setLoading(false)
  }

  async function deslogar() {
    await auth().signOut()
      .then(() => {
        setUser(null)
        navigation.navigate('SignIn')
      })
      .catch(() => {
        alert('Não ha usuários logados')
      })
  }

  return (
    <AuthContexto.Provider
      value={{
        user,
        criarLoja,
        logarUsuario,
        deslogar,
        erro,
        loading,
        atualizaLoja,
        registrarProduto
      }}>
      {children}
    </AuthContexto.Provider>
  );
}
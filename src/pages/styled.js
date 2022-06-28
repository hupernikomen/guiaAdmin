import styled from "styled-components/native";

export const ContainerInput = styled.View`
  width: 100%;
  height: 55px;
  margin-bottom: 8px;
  padding-left: 14px;
  padding-right: 14px;
  `
export const Input = styled.TextInput`
  flex: 1;
  width: 100%;
  align-self: center;
  background-color: #f3f3f3;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #000;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 0px;
  border-radius: 6px;
  z-index: 0;
  `
export const InputLogin = styled.TextInput`
  flex: 1;
  width: 100%;
  align-self: center;
  background-color: #f1f1f1;
  font-family: Roboto-Regular;
  font-size: 16px;
  color: ${props => props?.erro};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
  border-radius: 6px;
  z-index: 0;
`

export const TitleInput = styled.Text`
  position: absolute;
  font-family: 'Roboto-Light';
  font-size: 12px;
  z-index: 1;
  left: 30px;
  color: #222;
  padding-top: 6px;
  `

export const TextoSimples = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 12px;
  color: #000;
  `

export const TitleInputLogin = styled.Text`
  position: absolute;
  font-family: 'Roboto-Light';
  font-size: 12px;
  z-index: 1;
  left: 34px;
  color: ${props => props?.erro};
  padding-top: 6px;
  `
export const Botao = styled.TouchableOpacity`
  flex-direction: row;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #b22;
  elevation: 4;

  `
export const TextoBotao = styled.Text`
  color: #fff;
  font-family: 'Roboto-Medium';
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  `


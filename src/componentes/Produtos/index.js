import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EditProduto({ data, index }) {
	const navigation = useNavigation()
	const { width } = Dimensions.get('window');
	const [produto, setProduto] = useState([])

	useEffect(() => {
		setProduto(data)
	}, [])

	return (
		<View
			style={{
				width: '50%',
				paddingLeft: index % 2 === 0 ? 20 : 7,
				paddingRight: index % 2 === 1 ? 20 : 7,
				paddingTop: 14,
				paddingBottom: 5,
			}}>
			<TouchableOpacity
				style={{
					padding: 8,
					position: 'absolute',
					zIndex: 999,
					top: 14,
					right: index % 2 === 1 ? 20 : 7,
					backgroundColor: '#fff9',
				}}
				activeOpacity={.7}
				onPress={() => {
					navigation.navigate('Edicao', { produto })
				}}>

				<Icon name='pencil-outline' size={18} color={'#000'}

				/>
			</TouchableOpacity >

			<Image
				style={{
					borderRadius: 8,
					resizeMode: 'cover',
					height: (width / 2) - 21,
				}}
				source={{ uri: produto?.imagensUrl?.[0] }} />

			<View
				style={{
					paddingHorizontal: 4,
				}}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						paddingTop: 6,
					}}>
					<Text
						ellipsizeMode='tail'
						numberOfLines={2}
						style={{
							flex: 1,
							textTransform: 'capitalize',
							fontSize: 11,
							color: '#000',
							fontFamily: 'Roboto-Regular',
						}}>
						{produto?.nome}
					</Text>

				</View>

				{/* ------------------- Preços ------------------ */}

				{
					produto?.off ?
						<Text style={{
							marginVertical: 2,
							fontSize: 14,
							color: '#000',
							fontFamily: 'Roboto-Medium',
						}}>{produto?.off?.toFixed(2)?.replace('.', ',')}</Text>
						:
						<Text style={{
							marginVertical: 2,
							fontSize: 14,
							color: '#000',
							fontFamily: 'Roboto-Medium',
						}}>{produto?.preco?.toFixed(2)?.replace('.', ',')}</Text>
				}

			</View>
		</View >
	)
}


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
    var [name, setName] = useState('Don Bosco');
    var [adress, setAddress]= useState('calle 1, col. tecnologico');
    

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(adress.length<1) return alert ('Por favor introduzca una direccion');
		// FALTA HACER REGISTRO
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Registrar Parroquia</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} />
			<Input name="Dirección" value={adress} onChangeText={setAddress} />
			<Picker items={[
				{ label: 'Decanato 1', value: 'D1' },
				{ label: 'Decanato 2', value: 'D2' },
				{ label: 'Decanato 2', value: 'D3' },
			]} />
					
			<Button text="Registrar" loading={loading} onPress={doRegister} />
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginContainer: {
		height: '70%', 
		width: '100%', 
		padding: 10
	},
	header: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 20,
		marginTop: 20,
	}
})
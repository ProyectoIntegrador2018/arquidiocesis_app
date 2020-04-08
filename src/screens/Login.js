import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [email, setEmail] = useState('prueba@prubea.com');
	var [password, setPassword] = useState('contrasnaprueba');

	var doLogin = ()=>{
		if(loading) return;
		setLoading(true);

		if(email.length<5) return alert('Favor de ingresar un correo electrónico válido.');
		if(password.length<3) return alert('Favor de ingresar una contraseña válida');

		setLoading(true);
		API.login(email, password).then(user=>{
			if(!user) return alert("Correo o contraseña invalida.")
			setLoading(false);
			if(props.onLogin) props.onLogin(user);
		}).catch(err=>{
			setLoading(false);
			alert("Hubo un error realizando el login.")
		})
	}

	useEffect(()=>{
		
	}, [props.user])

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ backgroundColor: 'white', height: '30%', width: '100%',paddingTop:20, paddingBottom:60  }}>
				<View style={{alignItems:"center", justifyContent:"center"}}>
				<Image source={require("../../assets/logo.jpeg")} />
				</View>
			</View>
			{props.user===false ? (
				<View style={[styles.loginContainer, { alignItems: 'center', justifyContent: 'center' }]}>
					<ActivityIndicator size='large' color='black' />
				</View>
			) : (
				<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
					<Text style={styles.header}>Iniciar Sesión</Text> 
					<Input name="Correo electrónico" value={email} onChangeText={setEmail} textContentType={'emailAddress'} />
					<Input name="Contraseña" style={{ marginTop: 10 }} value={password} onChangeText={setPassword} textContentType={'password'} password />

					<Button text="Iniciar Sesión" loading={loading} onPress={doLogin} />
					
				</KeyboardAwareScrollView>
			)}
		</SafeAreaView>
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
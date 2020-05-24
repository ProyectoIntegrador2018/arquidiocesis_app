import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { API } from '../../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView, Item } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

export default (props)=>{
	var { onEdit, onDelete } = props.route.params;

	var [persona, setPersona] = useState(props.route.params.persona)
	var [error, setError] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [deleting, setDeleting] = useState(false);
	var [user, setUser] = useState(false);

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Coordinador',
		headerRight: ()=>(
			<TouchableOpacity onPress={editCoordinador}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	useEffect(()=>{
		API.getUser().then(setUser);
	}, [])

	var deleteCoordinador = ()=>{
		Alert.alert('¿Eliminar coordinador?', 'Esto eliminará los datos del coordinador y sus grupos se quedarán sin coordinador.', [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', style: 'destructive', onPress: ()=>{
				setDeleting(true);
				API.deleteCoordinador(persona.id).then(done=>{
					setDeleting(false);
					alert('Se ha eliminado el coordinador.');
					props.navigation.goBack();
					if(onDelete) onDelete(persona.id);
				}).catch(err=>{
					setDeleting(false);
					alert('Hubo un error eliminando el coordinador.')
				})
			} }
		]);
	}

	var changePassword = ()=>{
		props.navigation.navigate('ChangePassword', {
			admin_email: persona.email
		})
	}

	var editCoordinador = ()=>{
		props.navigation.navigate('EditCoordinador', {
			persona,
			onEdit: data=>{
				var p = {...persona}
				for(var i in data){
					p[i] = data[i];
				}
				setPersona(p);
				onEdit(p.id, p);
			}
		})
	}

	var getFechaNacimiento = ()=>{
		if(!persona.fecha_nacimiento || !persona.fecha_nacimiento._seconds){
			return moment().format('MMMM DD, YYYY')
		}
		var f = moment.unix(persona.fecha_nacimiento._seconds).format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 50 }}>
			<View style={{ padding: 15 }}>
				<Input name='Correo Electrónico' value={persona.email} readonly />
				<Input name="Nombre" value={persona.nombre} readonly/>
				<Input name="Apellido Paterno" value={persona.apellido_paterno} readonly/>
				<Input name="Apellido Materno" value={persona.apellido_materno} readonly/>
				<Input value={getFechaNacimiento()} name={'Fecha de nacimiento'} readonly/>
				<Input name='Estado Civil' value={persona.estado_civil} readonly />
				<Input name='Sexo' value={persona.sexo} readonly />
				<Input name='Grado escolaridad' value={persona.escolaridad} readonly />
				<Input name='Oficio' value={persona.oficio} readonly />

				<Text style={styles.section}>Domicilio</Text> 
				<Input name="Domicilio" value={persona.domicilio.domicilio} readonly />
				<Input name="Colonia" value={persona.domicilio.colonia} readonly />
				<Input name="Municipio" value={persona.domicilio.municipio} readonly />
				<Input name="Teléfono Casa" value={persona.domicilio.telefono_casa} readonly />
				<Input name="Teléfono Móvil" value={persona.domicilio.telefono_movil} readonly />
			</View>

			{user && (user.type=='admin' || user.type=='superadmin') && <Item text="Cambiar contraseña" onPress={changePassword} />}
			{user && (user.type=='admin' || user.type=='superadmin') && <Item text="Eliminar coordinador" onPress={deleteCoordinador} loading={deleting} />}
		</KeyboardAwareScrollView>
	)
		
}


const styles = StyleSheet.create({
  	section: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		color: 'grey',
		marginBottom: 10,
		marginTop: 20,
  	}
})
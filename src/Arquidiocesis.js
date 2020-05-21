import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'

import { 
	Login, 
	Parroquias, 
	Parroquia,
	Decanato, 
	Coordinadores, 
	Grupos, 
	Capacitacion, 
	Asistencia, 
	ZonasList, 
	Zona, 
	RegistroAdmin, 
	DetallePersona, 
	RegistroCoordinador, 
	AltaPquia, 
	RegistroMiembro, 
	RegistroGrupo,
	Grupo,
	AltaCapilla,
	EditMiembro,
	FichaMedica,
	DetalleCapilla,
	DetalleMiembro,
	User,
	ChangePassword,
	AdminUsers,
	DetalleAdmin,
	EditAdmin,
	ChangeCoordinador,
	EditGrupo
} from './screens';
import { API } from './lib'

var Tab = createBottomTabNavigator();
var Home = (props)=>{
	var [user, setUser] = useState(false);
	var { navigation } = props;

	var gotoUser = ()=>{
		props.navigation.navigate('User', {
			logout: props.route.params.logout
		})
	}

	navigation.setOptions({
		headerLeft: () => (
		  <TouchableOpacity onPress={gotoUser}>
			  <View style={{ width: 50, height: 40, alignItems: 'center', justifyContent: 'center' }}>
					<FontAwesome5 name="user-circle" solid size={25} color={'white'} />
			  </View>
		  </TouchableOpacity>
		),
		headerTitle: 'Arquidiocesis'
	});

	useEffect(()=>{
		API.getUser().then(setUser);
	}, []);

	return (
		<Tab.Navigator initialRouteName='Parroquias' screenOptions={({route})=>({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				switch(route.name){
					case 'Parroquias': iconName = 'church';
					break;
					case 'Zonas': iconName = 'globe-americas'
					break;
					case 'Coordina': iconName = 'user-circle'
					break;
					case 'HeMa': iconName = 'users'; 
					break;
					case 'Capacitacion': iconName = 'chalkboard-teacher';
					break;
					default: iconName = 'exclamation-circle'
				}
            return <FontAwesome5 name={iconName} size={size} color={color} style={{ paddingTop: 5 }} />;
          },
		})}>
			{user.type!='coordinador' ? (
				<>
					<Tab.Screen name="Parroquias" component={Parroquias} />
					<Tab.Screen name="Zonas" component={ZonasList} />
					<Tab.Screen name="Coordina" component={Coordinadores} />
				</>
			) : null}
			<Tab.Screen name="HeMa" component={Grupos} />
			<Tab.Screen name="Capacitacion" component={Capacitacion} />

		</Tab.Navigator>
	)
}
var Stack = createStackNavigator();
var App = (props)=>{
	
	return (
		<NavigationContainer>
			<Stack.Navigator user={props.user} initialRouteName='Home' screenOptions={{
				headerStyle: { backgroundColor: '#002E60' },
				headerTintColor: 'white'
			}}>
				<Stack.Screen name="Home" component={Home} initialParams={{ logout: props.logout }} />
				<Stack.Screen name="RegistroAdmin" component={RegistroAdmin}/>
				<Stack.Screen name="RegistroCoordinador" component={RegistroCoordinador}/>
				<Stack.Screen name="Asistencia" component={Asistencia} />
				<Stack.Screen name="Decanato" component={Decanato} />
				<Stack.Screen name="Zona" component={Zona} />
				<Stack.Screen name="AltaPquia" component={AltaPquia} />
				<Stack.Screen name="RegistroMiembro" component={RegistroMiembro}/>
				<Stack.Screen name="AltaCapilla" component={AltaCapilla}/>
				<Stack.Screen name="RegistroGrupo" component={RegistroGrupo}/>
				<Stack.Screen name="Parroquia" component={Parroquia} />
				<Stack.Screen name="EditMiembro" component={EditMiembro} />
				<Stack.Screen name="DetallePersona" component={DetallePersona}/>
				<Stack.Screen name="Grupo" component={Grupo}/>
				<Stack.Screen name="FichaMedica" component={FichaMedica}/>
				<Stack.Screen name="DetalleCapilla" component={DetalleCapilla}/>
				<Stack.Screen name="DetalleMiembro" component={DetalleMiembro}/>
				<Stack.Screen name="User" component={User}/>
				<Stack.Screen name="ChangePassword" component={ChangePassword}/>
				<Stack.Screen name="AdminUsers" component={AdminUsers}/>
				<Stack.Screen name="DetalleAdmin" component={DetalleAdmin}/>
				<Stack.Screen name="EditAdmin" component={EditAdmin}/>
				<Stack.Screen name="EditGrupo" component={EditGrupo}/>
				<Stack.Screen name="ChangeCoordinador" component={ChangeCoordinador}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default (props)=>{

	var [login, setLogin] = useState(false);

	// This function runs when the screen is shown.
	useEffect(()=>{
		checkLogin()
	}, [])
	
	// Check to see if the user is logged in.
	var checkLogin = ()=>{
		API.getLogin().then(user=>{
			if(!user) return setLogin(null);
			setLogin(user)
		})
	}

	var onLogin = (user)=>{
		setLogin(user);
	}

	var logout = ()=>{
		API.logout().then(done=>{
			setLogin(null);
		})
	}

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<StatusBar barStyle={'light-content'} />
			{!login ? (
				<Login user={login} onLogin={onLogin} />
			) : ( 							// User is logged in
				<App user={login} logout={logout} />
			)}
		</View>
	)
}
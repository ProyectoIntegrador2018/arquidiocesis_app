import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Util } from '../../lib';
import { Input, Button, Picker } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsersConvAPI from '../../lib/apiV2/UsersConvAPI';

export default (props) => {
  const [user, setUser] = useState({ tipo: 'integrante_chm' });
  const [loading, setLoading] = useState(false);
  const { onClose } = props;

  const setValue = (k) => {
    return (v) =>
      setUser((u) => {
        u[k] = v;
        return u;
      });
  };

  const register = () => {
    const { valid, prompt } = Util.validateForm(user, {
      nombre: {
        type: 'minLength',
        value: 2,
        prompt: 'Favor de introducir el nombre del usuario.',
      },
      apellido_paterno: {
        type: 'minLength',
        value: 2,
        prompt: 'Favor de introducir el apellido paterno del usuario.',
      },
      sexo: {
        type: 'empty',
        prompt: 'Favor de seleccionar el sexo del usuario.',
      },
      email: {
        type: 'email',
        prompt: 'Favor de introducir un correo electrónico válido.',
      },
      password: {
        type: 'minLength',
        value: 5,
        prompt:
          'Favor de introducir la contraseña del usuario, mínimo 5 caracteres.',
      },
    });
    if (!valid) {
      return alert(prompt);
    }
    setLoading(true);
    UsersConvAPI.registerUser(user)
      .then((result) => {
        setLoading(false);
        if (result.error === true) {
          return alert(result.message ?? 'Hubo un error creando el usuario.');
        }
        onClose();
      })
      .catch(() => {
        setLoading(false);
        return alert('Hubo un error creando el usuario.');
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ padding: 15 }}>
      <Input
        name="Nombre"
        value={user.nombre}
        onChangeText={setValue('nombre')}
      />
      <Input
        name="Apellido Paterno"
        value={user.apellido_paterno}
        onChangeText={setValue('apellido_paterno')}
      />
      <Input
        name="Apellido Materno"
        value={user.apellido_materno}
        onChangeText={setValue('apellido_materno')}
      />
      <Picker
        name="Sexo"
        items={['Masculino', 'Femenino', 'Sin especificar']}
        onValueChange={setValue('sexo')}
      />

      {/*<Picker
                name="Acceso"
                items={[
                { label: 'Administrador General', value: 'admin' },
                { label: 'Integrante de la CHM', value: 'integrante_chm' },
                { label: 'Capacitación', value: 'capacitacion' },
                ]}
                onValueChange={(v) => setValue('tipo')(v ? v.value : null)}
            /> */}

      <Text style={styles.subHeader}>Credenciales</Text>
      <Input
        name="Correo electrónico"
        value={user.email}
        onChangeText={setValue('email')}
      />
      <Input
        name="Contraseña"
        value={user.password}
        onChangeText={setValue('password')}
        password
      />

      <Button text="Registrarse" onPress={register} loading={loading} />
      <Button text="Cancelar" onPress={() => onClose()} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  testText: {
    fontSize: 20,
  },
  section: {
    fontSize: 16,
    color: 'gray',
    marginTop: 30,
    fontWeight: '500',
    paddingLeft: 15,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'grey',
    marginVertical: 10,
  },
});

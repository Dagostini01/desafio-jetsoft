import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { s } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUsuarioStore } from '../../store/store';

// Definir os tipos das telas na navegação
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// Definir o tipo para a prop `navigation`
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export function Login({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const { salvarUsuario, carregarUsuario, usuario } = useUsuarioStore();

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    if (usuario) {
      navigation.replace("Home");
    }
  }, [usuario]);

  async function handleLogin() {
    if (nome.trim().length < 1) {
      Alert.alert("Erro", "Digite um nome válido!");
      return;
    }
    await salvarUsuario(nome);
    navigation.replace("Home");
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Bem-vindo!</Text>
      <Text style={s.subtitle}>Digite seu nome para entrar:</Text>

      <TextInput
        style={s.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={s.button} onPress={handleLogin}>
        <Text style={s.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

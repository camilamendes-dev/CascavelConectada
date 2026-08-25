import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { api } from '../services/api';

// RF02 — login por e-mail e senha
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin() {
    try {
      const { data } = await api.post('/usuarios/login', { email, senha });
      // TODO: salvar token (AsyncStorage) e navegar para MapaScreen
      navigation.navigate('Mapa');
    } catch (err) {
      setErro('E-mail ou senha inválidos');
    }
  }

  return (
    <View style={{ padding: 24 }}>
      <Text>CascavelConectada</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      {erro ? <Text>{erro}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { s } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useUsuarioStore } from "../../store/store";

// Definir os tipos das telas
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// Tipagem correta da navegação
type HeaderNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function Header() {
  const { usuario, logout } = useUsuarioStore();
  const navigation = useNavigation<HeaderNavigationProp>(); // Tipagem correta do navigation

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sair", 
        onPress: async () => {
          await logout();
          navigation.replace("Login"); // Agora TypeScript reconhece o método replace()
        } 
      }
    ]);
  }

  return (
    <View style={s.container}>
      <SafeAreaView style={s.userInfo}>
        <View style={s.user}>
          <Image
            style={s.image}
            source={require("../../../assets/user.png")}
          />
          <View style={{ flex: 1 }}>
            <Text style={s.text}>Olá, {usuario || "Usuário"}!</Text>
            <Text style={s.text}>Seja bem-vindo ao App</Text>
          </View>
        </View>

        <TouchableOpacity style={{marginRight: 20}} onPress={handleLogout}>
          <Ionicons 
            name={"log-out"} 
            color={"#ff0000"} 
            size={25} 
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

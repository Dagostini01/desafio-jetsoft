import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { s } from './styles';
import { Tarefa } from '../../components/Tarefa';
import { useTarefaStore } from '../../store/store';
import { Header } from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const {
        tarefas,
        tarefaCheck,
        filtro,
        tarefaAtual,
        dataVencimentoAtual,
        setTarefaAtual,
        setDataVencimentoAtual,
        adicionarTarefa,
        removerTarefa,
        desfazerUltimaExclusao,
        marcarComoConcluida,
        alterarFiltro,
        carregarTarefas
    } = useTarefaStore();

    

    const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

    useEffect(() => {
        carregarTarefas();
    }, []);


    function handleTarefaAdd() {
        if (tarefaAtual.trim().length < 1) {
            Alert.alert("Atenção", "Digite uma tarefa!");
            return;
        }

        // Validação para garantir que a data de vencimento não seja anterior a hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataVencimentoAtual < hoje) {
            Alert.alert("Erro", "A data de vencimento não pode ser anterior ao dia atual!");
            return;
        }

        adicionarTarefa();
    }

    function handleTarefaRemove(value: string) {
        removerTarefa(value);
        
        Alert.alert("Tarefa Removida", "Você deseja desfazer essa ação?", [
            { text: "Desfazer", onPress: desfazerUltimaExclusao },
            { text: "OK" }
        ]);
    }

    function handleTarefaCheck(value: string) {
        marcarComoConcluida(value);
    }

    function handleTarefaFilter() {
        Alert.alert("Reordenar Tarefas", "Selecione o tipo de filtro para as suas tarefas:", [
            { text: "Todas", onPress: () => alterarFiltro("Todas") },
            { text: "Concluídas", onPress: () => alterarFiltro("Concluídas") },
            { text: "Pendentes", onPress: () => alterarFiltro("Pendentes") }
        ]);
    }

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtro === "Todas") return true;
        if (filtro === "Concluídas") return tarefaCheck.includes(tarefa.conteudo);
        if (filtro === "Pendentes") return !tarefaCheck.includes(tarefa.conteudo);
    });

    return (
        <View style={{ flex: 1 }}>
            <Header />

            <View style={s.container}>
                <View style={s.form}>
                    <TextInput
                        style={s.input}
                        placeholder="Adicione uma nova tarefa"
                        placeholderTextColor="#6B6B6B"
                        value={tarefaAtual}
                        onChangeText={setTarefaAtual}
                    />

                    <TouchableOpacity style={s.button} onPress={() => setMostrarDatePicker(true)}>
                        <Ionicons name="calendar" size={20} color="#ffffff" />
                    </TouchableOpacity>

                    {mostrarDatePicker && (
                        <DateTimePicker
                            value={dataVencimentoAtual}
                            mode="date"
                            minimumDate={new Date()} // Impede datas passadas
                            onChange={(event, selectedDate) => {
                                setMostrarDatePicker(false);
                                if (selectedDate) {
                                    setDataVencimentoAtual(selectedDate);
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity style={s.button} onPress={handleTarefaAdd}>
                        <Ionicons name="add" size={20} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                <View style={s.info}>
                    <View style={s.description}>
                        <Text style={s.descriptionText}>Criadas</Text>
                        <View style={s.descriptionNumber}>
                            <Text>{tarefas.length}</Text>
                        </View>
                    </View>
                    <View style={s.description}>
                        <Text style={s.descriptionText2}>Concluídas</Text>
                        <View style={s.descriptionNumber}>
                            <Text>{tarefaCheck.length}</Text>
                        </View>
                    </View>
                    <View style={s.description}>
                        <TouchableOpacity style={s.button2} onPress={handleTarefaFilter}>
                            <View>
                                <Ionicons name="filter" size={15} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={tarefasFiltradas}
                    keyExtractor={tarefa => tarefa.conteudo}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Tarefa
                            key={item.conteudo}
                            conteudo={item.conteudo}
                            dataCriacao={item.dataCriacao}
                            dataVencimento={item.dataVencimento}
                            onRemove={() => handleTarefaRemove(item.conteudo)}
                            onCheck={() => handleTarefaCheck(item.conteudo)}
                            check={tarefaCheck.includes(item.conteudo)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={s.containerlistEmptyText}>
                            <Ionicons name="documents-outline" size={100} color="#4EA8DE" />
                            <Text style={s.listEmptyText1}>Você ainda não tem tarefas cadastradas</Text>
                            <Text style={s.listEmptyText2}>Crie tarefas e organize seus itens a fazer</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

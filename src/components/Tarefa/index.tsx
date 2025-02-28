import React, { memo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";

type Props = {
    conteudo: string;
    dataCriacao: string;
    dataVencimento: string;
    onRemove: () => void;
    onCheck: () => void;
    check: boolean;
};

const TarefaComponent = ({ conteudo, dataCriacao, dataVencimento, onRemove, onCheck, check }: Props) => {
    return (
        <View>
            <View style={s.container}>
                <TouchableOpacity style={s.button} onPress={onCheck}>
                    <Ionicons name={check ? "checkmark-circle" : "ellipse-outline"} size={20} color="#4EA8DE" />
                </TouchableOpacity>

                <Text style={check ? s.text2 : s.text}>{conteudo}</Text>

                <TouchableOpacity onPress={onRemove}>
                    <Ionicons style={s.button} name="trash" size={20} color="#808080" />
                </TouchableOpacity>
            </View>
            <Text style={s.textData}>Criado: {dataCriacao}</Text>
            <Text style={s.textData}>Vence: {dataVencimento}</Text>
        </View>
    );
};

// Envolver o componente com React.memo para evitar renderizações desnecessárias
export const Tarefa = memo(TarefaComponent, (prevProps, nextProps) => {
    return (
        prevProps.conteudo === nextProps.conteudo &&
        prevProps.dataCriacao === nextProps.dataCriacao &&
        prevProps.dataVencimento === nextProps.dataVencimento &&
        prevProps.check === nextProps.check
    );
});

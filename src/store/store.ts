import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ========================
// 🌟 Estado do Usuário
// ========================
type UsuarioState = {
    usuario: string | null;
    carregarUsuario: () => Promise<void>;
    salvarUsuario: (nome: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const useUsuarioStore = create<UsuarioState>((set) => ({
    usuario: null,

    carregarUsuario: async () => {
        try {
            const nomeSalvo = await AsyncStorage.getItem('usuario');
            if (nomeSalvo) {
                set({ usuario: nomeSalvo });
            }
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        }
    },

    salvarUsuario: async (nome) => {
        try {
            await AsyncStorage.setItem('usuario', nome);
            set({ usuario: nome });
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem('usuario');
            set({ usuario: null });
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    },
}));

// ========================
// 📌 Estado das Tarefas
// ========================
type Tarefa = {
    conteudo: string;
    dataCriacao: string;
    dataVencimento: string;
};

type EstadoTarefas = {
    tarefas: Tarefa[];
    tarefaCheck: string[];
    filtro: 'Todas' | 'Concluídas' | 'Pendentes';
    tarefaAtual: string;
    dataVencimentoAtual: Date;
    ultimaTarefaExcluida: Tarefa | null;
    setTarefaAtual: (conteudo: string) => void;
    setDataVencimentoAtual: (data: Date) => void;
    adicionarTarefa: () => void;
    removerTarefa: (conteudo: string) => void;
    desfazerUltimaExclusao: () => void;
    marcarComoConcluida: (conteudo: string) => void;
    alterarFiltro: (filtro: 'Todas' | 'Concluídas' | 'Pendentes') => void;
    carregarTarefas: () => Promise<void>;
};

export const useTarefaStore = create<EstadoTarefas>((set, get) => ({
    tarefas: [],
    tarefaCheck: [],
    filtro: 'Todas',
    tarefaAtual: "",
    dataVencimentoAtual: new Date(),
    ultimaTarefaExcluida: null,

    setTarefaAtual: (conteudo) => set({ tarefaAtual: conteudo }),
    setDataVencimentoAtual: (data) => set({ dataVencimentoAtual: data }),

    adicionarTarefa: async () => {
        const { tarefaAtual, dataVencimentoAtual, tarefas } = get();

        if (tarefaAtual.length < 1) return;

        const novaTarefa = { 
            conteudo: tarefaAtual, 
            dataCriacao: new Date().toLocaleDateString(), 
            dataVencimento: dataVencimentoAtual.toLocaleDateString() 
        };

        const novasTarefas = [...tarefas, novaTarefa];
        await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));

        set({ tarefas: novasTarefas, tarefaAtual: "", dataVencimentoAtual: new Date() });
    },

    removerTarefa: async (conteudo) => {
        const { tarefas } = get();
        const tarefaExcluida = tarefas.find(t => t.conteudo === conteudo);
        if (!tarefaExcluida) return;

        const novasTarefas = tarefas.filter(t => t.conteudo !== conteudo);
        await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));

        set({ tarefas: novasTarefas, ultimaTarefaExcluida: tarefaExcluida });
    },

    desfazerUltimaExclusao: () => {
        const { ultimaTarefaExcluida, tarefas } = get();
        if (!ultimaTarefaExcluida) return;

        const novasTarefas = [ultimaTarefaExcluida, ...tarefas];
        AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));

        set({ tarefas: novasTarefas, ultimaTarefaExcluida: null });
    },

    marcarComoConcluida: async (conteudo) => {
        set((state) => {
            const novaLista = state.tarefaCheck.includes(conteudo)
                ? state.tarefaCheck.filter(t => t !== conteudo)
                : [...state.tarefaCheck, conteudo];

            AsyncStorage.setItem('tarefaCheck', JSON.stringify(novaLista));
            return { tarefaCheck: novaLista };
        });
    },

    alterarFiltro: (filtro) => set({ filtro }),

    carregarTarefas: async () => {
        try {
            const tarefasSalvas = await AsyncStorage.getItem('tarefas');
            const checksSalvos = await AsyncStorage.getItem('tarefaCheck');

            if (tarefasSalvas) {
                set({ tarefas: JSON.parse(tarefasSalvas) });
            }
            if (checksSalvos) {
                set({ tarefaCheck: JSON.parse(checksSalvos) });
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
    },
}));

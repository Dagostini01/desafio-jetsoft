# 📌 Projeto de Gerenciamento de Tarefas

## 📖 Descrição
Este é um aplicativo de gerenciamento de tarefas que permite aos usuários criar, editar e remover tarefas, além de marcar tarefas como concluídas. Os dados são persistidos localmente com **AsyncStorage**, garantindo que as informações sejam mantidas entre sessões.

## 🚀 Tecnologias Utilizadas
- **React Native**
- **Zustand** (Gerenciamento de Estado)
- **AsyncStorage** (Persistência de Dados)
- **DateTimePicker** (Seleção de Datas)

## ⚙️ Funcionalidades
- **Adicionar tarefas** com data de vencimento validada.
- **Marcar tarefas como concluídas**.
- **Remover tarefas**, com opção de **desfazer** a última exclusão.
- **Filtrar tarefas** por status (Todas, Concluídas, Pendentes).
- **Persistência local** para manter as tarefas salvas entre sessões.

## 📌 Decisões Técnicas e Arquiteturais
- Optei por **Zustand** para o gerenciamento de estado por ser leve e eficiente.
- Separei a gestão do usuário (`useUsuarioStore`) e das tarefas (`useTarefaStore`) para melhor organização.
- Usei **AsyncStorage** para armazenar os dados localmente.
- Implementei a validação no **DateTimePicker** para impedir datas inválidas.
- Desenvolvi um recurso de **"Desfazer"** para restaurar a última tarefa excluída.
- Organizei a estrutura do código com **componentes reutilizáveis** (`Tarefa.tsx`, `Header.tsx`).

## 🛠️ Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-repositorio.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd nome-do-projeto
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```
4. Execute o projeto:
   ```bash
   npx expo start
   ```

## 📌 Melhorias Futuras
- Implementação de **notificações** para lembrar o usuário de tarefas pendentes.
- Integração com **backend** para sincronização em múltiplos dispositivos.
- **Modo escuro** para melhor experiência do usuário.

## 📝 Conclusão
Com essas decisões, consegui desenvolver um aplicativo eficiente e organizado, garantindo persistência de dados e uma experiência de usuário aprimorada. O código está modular e escalável, pronto para futuras melhorias.

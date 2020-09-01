# sheet-sender-server
Software para ajudar colaboradores a performar durante seu horário de expediente

**Descrição e Objetivo do projeto:**<br>
Constantemente queremos performar mais durante nosso expediente no dia-a-dia de trabalho. Porém, quando chegamos ao final do dia, temos a sensação de que já está na hora de encerrarmos e ainda temos um enorme backlog de tarefas. Este projeto tem o objetivo de informar o colaborador do tempo gasto em suas atividades de uma forma gráfica e simples de entender onde ele precisa aumentar ou reduzir o esforço durante sua jornada de trabalho.

**OBS:** Este projeto somente consiste na API back-end, o projeto client-side em React está em outro repositório

**Tecnologias Utilizadas:**
* Linguagem: Javascript | node.js
* Banco de Dados: CouchDB | IBM Cloudant
* Versionamento: GIT | GITHUB

**Escopo & Requisitos funcionais:**
1. O usuário poderá se cadastrar na plataforma;
2. O usuário poderá se logar na plataforma;
3. O usuário poderá atualizar suas informações na plataforma;
4. O usuário poderá iniciar seu expediente;
5. O usuário poderá encerrar seu expediente;
6. O usuário poderá ver em tempo real uma lista contendo suas atividades do expediente;
7. O usuário poderá ver em tempo real um gráfico em tempo real de suas atividades;
8. O usuário ao encerrar o expediente verá em tela cheia o gráfico de seu expediente;
9. O usuário poderá pesquisar por relatório de expedientes já realizados;

**Arquitetura da aplicação:**
![Alt text](docs/SheetSender%20-%20Arquitetura.JPG)
<br>

**Workflow do Usuário:**
![Alt text](docs/Workflow%20do%20Usuário.png)

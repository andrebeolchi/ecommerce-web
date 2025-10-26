# Kafka Microservices Frontend

Interface web para o [sistema de microsserviços com Kafka](https://github.com/andrebeolchi/kafka-microservices), construída em **Next.js** para demonstrar a integração entre múltiplos serviços distribuídos.

---

## Índice

- [Kafka Microservices Frontend](#kafka-microservices-frontend)
  - [Índice](#índice)
  - [O que é este Projeto?](#o-que-é-este-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Como Testar o Projeto?](#como-testar-o-projeto)
    - [Navegação do E-commerce](#navegação-do-e-commerce)
    - [Fluxo de Teste Completo](#fluxo-de-teste-completo)
  - [Como Executar o Projeto?](#como-executar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Passos para Configuração](#passos-para-configuração)
  - [Stack](#stack)
  - [Scripts](#scripts)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Integração com Microsserviços](#integração-com-microsserviços)
    - [APIs Consumidas](#apis-consumidas)
    - [Fluxo de Dados](#fluxo-de-dados)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Frontend Core](#frontend-core)
    - [UI/UX](#uiux)
    - [Integrações](#integrações)
    - [Desenvolvimento](#desenvolvimento)

---

## O que é este Projeto?

Frontend em **Next.js** que conecta com uma arquitetura de microserviços, demonstrando como construir uma interface moderna que consome múltiplos serviços distribuídos.  
O projeto foca no aprendizado de integração entre frontend e backend distribuído usando **Kafka** para comunicação assíncrona.

---

## Funcionalidades

- 🛍️ **Catálogo de Produtos** - Navegação e busca de produtos via **Elasticsearch**
- 🛒 **Carrinho de Compras** - Gerenciamento de itens com estado persistente
- 📋 **Gerenciamento de Pedidos** - Criação e acompanhamento de pedidos
- 🔐 **Autenticação** - Login/registro com **JWT**

---

## Como Testar o Projeto?

### Navegação do E-commerce

1. Acesse a página inicial: [http://localhost:9000](http://localhost:9000)
2. Faça login/registro
3. Explore o catálogo de produtos
4. Adicione produtos ao carrinho
5. Crie pedidos e acompanhe o status

### Fluxo de Teste Completo

Siga o fluxo do catálogo → carrinho → checkout → acompanhamento de pedidos.

---

## Como Executar o Projeto?

### Pré-requisitos

- Node.js
- Yarn ou npm
- [Microsserviços backend rodando](https://github.com/andrebeolchi/kafka-microservices)

### Passos para Configuração

1. Clone e acesse o diretório:

```bash
git clone git@github.com:andrebeolchi/kafka-ms-frontend.git
cd kafka-ms-frontend
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

5. Acesse a aplicação em [http://localhost:9000](http://localhost:9000)

---

## Stack

- **Next.js** 15.3.4
- **React** ^19.0.0
- **TypeScript** ^5.3.0
- **Tailwind CSS** ^4
- **shadcn/ui** (componentes instalados manualmente)
- **clsx, class-variance-authority, tailwind-merge**
- **lucide-react** para ícones
- **axios** para requisições HTTP
- **react-hook-form** para formulários
- **zod** para validação
- **next-themes** para tema claro/escuro
- **eslint, prettier** para qualidade de código

---

## Scripts

| Script          | Descrição                            |
| --------------- | ------------------------------------ |
| `yarn dev`      | Inicia o servidor de desenvolvimento |
| `yarn lint`     | Executa ESLint                       |
| `yarn lint:fix` | Corrige problemas do ESLint          |

---

## Estrutura do Projeto

```plain
/kafka-microservices-frontend
├─ /adapters    # Integrações com APIs externas
├─ /app         # Páginas e rotas do Next.js
├─ /components  # Componentes reutilizáveis
├─ /core        # Lógica central do frontend
├─ /lib         # Utilitários e helpers
├─ /models      # Modelos de dados e tipos
├─ /modules     # Funcionalidades específicas
├─ /utils       # Funções utilitárias
```

---

## Integração com Microsserviços

### APIs Consumidas

- **Catalog Service** (http://localhost:3000) - Produtos e busca
- **Order Service** (http://localhost:3001) - Carrinho e pedidos
- **User Service** (http://localhost:3002) - Autenticação
- **Payment Service** (http://localhost:3003) - Processamento de pagamentos

### Fluxo de Dados

O frontend consome dados dos microsserviços via **HTTP** e mantém estado local com **React Context**, recebendo atualizações em tempo real via Kafka.

---

## Tecnologias Utilizadas

### Frontend Core

- **Next.js** com **App Router**
- **React** com **Server Components**
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização

### UI/UX

- **shadcn/ui** para componentes base
- **Lucide React** para ícones

### Integrações

- **Axios** para requisições HTTP
- **JWT** para autenticação

### Desenvolvimento

- **ESLint** + **Prettier** para qualidade de código
- **TypeScript** para tipagem

> [!NOTE]
> Este frontend foi desenvolvido para demonstrar a integração com uma arquitetura de microsserviços distribuída.

# 🖥 MIS – FRONTEND

O **MIS Frontend** é a interface web do **Management Information System** da **RAMAX-GROUP**, responsável por apresentar visões gerenciais, executivas, auditorias e módulos de compliance de forma centralizada, performática e orientada a dados.

O projeto foi desenhado para consumir o **MIS Backend** e atuar como a **camada de apresentação e orquestração de estado**, mantendo forte separação entre UI, regras de tela e integração com APIs.

---

## 🛠 Specs

- **Runtime:** Node.js 20.18
- **Package Manager:** NPM 10.8
- **Linguagem:** TypeScript
- **Framework:** React
- **Meta-framework:** Next.js (App Router)
- **UI:** Material UI (MUI)
- **HTTP State:** TanStack Query
- **URL State:** Nuqs

---

## 🎯 Escopo

O MIS Frontend atende múltiplas camadas do negócio:

- **Gerencial:** dashboards por área, relatórios e análises operacionais
- **Executiva:** KPIs, visões consolidadas e indicadores estratégicos
- **Auditoria:** telas de rastreabilidade, monitoramento e validação
- **Compliance & GRC:** intranet, políticas, treinamentos e documentos

O foco do frontend é **experiência do usuário, clareza da informação e consistência de estado**.

---

## 🗂 Arquitetura

O projeto segue a arquitetura recomendada pelo **Next.js App Router**, com separação clara entre **rotas, componentes, estado e serviços**.

```text
src
├── app                    # Rotas e layouts (Next.js App Router)
│   ├── layout.tsx
│   └── <feature>
│       ├── <components>
│       ├── <constants>
│       ├── page.tsx
│       └── layout.tsx
├── assets                 # Assets estáticos (imagens, ícones, etc.)
├── components             # Componentes reutilizáveis (UI e layout)
├── constants              # Constantes globais (enums, mapas, configs)
├── contexts               # Contextos globais (auth, tema, app state)
├── hooks                  # Hooks customizados
├── services               # Integração com APIs (HTTP)
├── types                  # Tipagens globais e contratos
├── utils                  # Funções utilitárias
└── test                   # Testes
```

---

## 🔄 Estado e Dados

- **TanStack Query**

  - Cache e sincronização de requisições
  - Controle de loading, erro e refetch
  - Ideal para dados remotos

- **Nuqs**

  - Estado sincronizado com a URL
  - Filtros, paginação e ordenação persistentes
  - Deep linking

- **Contexts + Hooks**

  - Autenticação
  - Tema
  - Permissões e sessão

---

## 🔐 Fluxos Principais

- Autenticação baseada em **JWT**
- Controle de acesso por perfil/permissão
- Navegação orientada a domínio
- Estados de loading, erro e empty state padronizados

---

## 🚀 Considerações

O **MIS Frontend** foi projetado para ser:

- Escalável
- Orientado a domínio
- Focado em UX para dados complexos
- Alinhado a práticas enterprise

Ele representa a camada visual e interativa do ecossistema MIS, mantendo consistência arquitetural com o backend e suportando a evolução contínua dos módulos do sistema.

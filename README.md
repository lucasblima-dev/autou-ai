# AutoU - Classificador Inteligente de Emails

**Análise e classificação de emails com sugestão de respostas utilizando Inteligência Artificial.**

Este projeto foi desenvolvido como parte do Case Prático para o processo seletivo da AutoU.


## Links

- **Aplicação Online:** **[LINK AQUI DEPOIS]**
- **Vídeo de Apresentação:** **[LINK AQUI DEPOIS]**


## Sobre o Projeto

O AutoU Classifier é uma aplicação web que visa otimizar a triagem de emails, classificando-os automaticamente como **Produtivos** ou **Improdutivos**. Com base na classificação, a ferramenta sugere uma resposta apropriada, economizando tempo e aumentando a eficiência da equipe.

### Funcionalidades

-   [✔] **Análise de Texto:** Permite colar o texto de um email diretamente na interface.
-   [✔] **Upload de Arquivos:** Suporte para envio de arquivos `.txt` e `.pdf` contendo o email.
-   [✔] **Classificação com IA:** Utiliza um modelo de Processamento de Linguagem Natural para classificar o email.
-   [✔] **Sugestão de Resposta:** Gera uma resposta automática baseada no conteúdo e na categoria do email.
-   [✔] **Interface Moderna:** UI limpa e responsiva com modo escuro.
-   [✔] **Funcionalidades de UX:** Botões para copiar a sugestão e limpar o formulário.


## Tecnologias Utilizadas

Este projeto é um monorepo com duas partes principais:

**Frontend:**
-   **React** com **Vite**
-   **TypeScript**
-   **Tailwind CSS** para estilização
-   **Axios** para requisições HTTP
-   **Lucide React** para ícones

**Backend:**
-   **Python 3**
-   **FastAPI** para a criação da API REST
-   **Uvicorn** como servidor ASGI
-   **Hugging Face APIs** para os modelos de IA (Classificação e Geração de Texto)


## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação na sua máquina.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [Python](https://www.python.org/downloads/) (versão 3.8 ou superior)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:lucasblima-dev/autou-ai.git
    ```

2.  **Configurar o Backend:**
    ```bash
    cd backend
    python -m venv venv
    # Ativar ambiente virtual
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    # Instalar dependências
    pip install -r requirements.txt
    # Crie um arquivo .env e adicione sua chave da API do Hugging Face
    echo "HUGGING_FACE_API_KEY=hf_SUA_CHAVE_AQUI" > .env
    ```

3.  **Configurar o Frontend:**
    ```bash
    cd ../frontend
    npm install
    # Crie um arquivo .env e aponte para a URL do backend local
    echo "VITE_API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)" > .env
    ```

### Executando a Aplicação

Você precisará de dois terminais abertos.

1.  **Terminal 1: Rodar o Backend**
    ```bash
    cd backend
    # Ative o venv se ainda não estiver ativo
    uvicorn main:app --reload
    ```
    *O backend estará rodando em `http://127.0.0.1:8000`.*

2.  **Terminal 2: Rodar o Frontend**
    ```bash
    cd frontend
    npm run dev
    ```
    *O frontend estará acessível em `http://localhost:5173`.*

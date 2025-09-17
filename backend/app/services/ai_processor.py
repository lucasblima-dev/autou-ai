import os
import requests
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HUGGING_FACE_API_KEY")
CLASSIFICATION_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
hf_headers = {"Authorization": f"Bearer {HF_API_KEY}"}


def classify_text(text: str) -> str:
    if not HF_API_KEY:
        print("AVISO: Chave de API do Hugging Face não encontrada. A classificação pode falhar.")
        return "Produtivo"

    try:
        payload = {
            "inputs": text,
            "parameters": {"candidate_labels": ["Produtivo", "Improdutivo"]},
        }
        response = requests.post(CLASSIFICATION_API_URL, headers=hf_headers, json=payload)
        
        if response.status_code != 200:
            print(f"Erro na API de classificação: {response.status_code} - {response.text}")
            return "Produtivo" 

        api_response = response.json()
        best_label_index = api_response['scores'].index(max(api_response['scores']))
        return api_response['labels'][best_label_index]
        
    except Exception as e:
        print(f"Ocorreu uma exceção ao classificar o texto: {e}")
        return "Erro de Classificação"


def generate_mock_suggestion(category: str) -> str:
    if category.lower() == "produtivo":
        return "Obrigado pela sua mensagem. Sua solicitação está sendo processada e retornaremos em breve com uma atualização."
    elif category.lower() == "improdutivo":
        return "Agradecemos o contato. Sua mensagem foi recebida."
    else:
        return "Não foi possível gerar uma sugestão para esta categoria."


def process_email(text: str) -> dict:
    category = classify_text(text)
    suggestion = generate_mock_suggestion(category)
    
    return {
        "category": category,
        "suggestion": suggestion
    }
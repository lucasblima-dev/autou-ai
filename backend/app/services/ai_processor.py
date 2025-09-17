import os
import requests
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HUGGING_FACE_API_KEY")
CLASSIFICATION_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
hf_headers = {"Authorization": f"Bearer {HF_API_KEY}"}

GENERATION_API_URL = "https://hf.space/gradioiframe/gpt2/generate/api/predict/"

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


def generate_suggestion(text: str, category: str) -> str:
    if category.lower() == "produtivo":
        prompt = f"O seguinte email foi classificado como produtivo: '{text}'. Sugira uma resposta curta e profissional para este email em português."
    elif category.lower() == "improdutivo":
        prompt = f"O seguinte email foi classificado como improdutivo: '{text}'. Sugira uma resposta curta e educada em português."
    else:
        return "Não foi possível gerar uma sugestão pois a categoria é inválida."

    try:
        payload = {
            "data": [
                prompt,
            ]
        }
        
        response = requests.post(GENERATION_API_URL, json=payload)

        if response.status_code != 200:
            print(f"Erro no endpoint público de geração: {response.status_code} - {response.text}")
            return "Erro ao contatar o serviço de geração de texto."

        api_response = response.json()
        
        generated_text = api_response.get("data", ["Falha ao extrair texto."])[0]
        
        if generated_text.startswith(prompt):
            return generated_text[len(prompt):].strip()
        
        return generated_text.strip()

    except Exception as e:
        #print(f"Ocorreu uma exceção ao gerar sugestão: {e}")
        return "Erro ao processar a geração da sugestão."


def process_email(text: str) -> dict:
    category = classify_text(text)
    suggestion = generate_suggestion(text, category)
    
    return {
        "category": category,
        "suggestion": suggestion
    }
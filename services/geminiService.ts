import { GoogleGenAI, Type } from "@google/genai";
import type { Filters, Activity } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const activitySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Um título curto, divertido e criativo para a atividade. Máximo de 5 palavras.",
    },
    description: {
      type: Type.STRING,
      description: "Uma descrição clara e simples de como realizar a atividade, passo a passo. Escrita para um pai/mãe ler rapidamente. Máximo de 3 frases.",
    },
    materials_needed: {
      type: Type.STRING,
      description: "Os materiais necessários, em linha com o filtro 'materiais' do usuário. Se for 'Sem materiais', este campo deve dizer 'Nenhum!'.",
    },
    emoji: {
      type: Type.STRING,
      description: "Um único emoji que represente a atividade.",
    },
  },
  required: ["title", "description", "materials_needed", "emoji"],
};

export const generateActivity = async (filters: Filters): Promise<Activity> => {
  const { age, time, location, materials } = filters;

  const systemInstruction = `Você é um especialista em desenvolvimento infantil e criatividade, chamado 'BrincaMinuto'. Sua missão é ajudar pais ocupados a se conectarem com seus filhos através de atividades rápidas, fáceis e, acima de tudo, CRIATIVAS. Gere UMA ÚNICA atividade que estimule a imaginação, a colaboração e o pensamento original tanto dos pais quanto da criança. As atividades devem ser projetadas para que pais e filhos criem algo JUNTOS, seja uma história, um desenho, uma invenção ou uma pequena performance. Evite sugestões excessivamente simples ou repetitivas, especialmente para crianças mais velhas (por exemplo, apenas 'esconder um objeto'). O tom deve ser encorajador, mágico e amigável. NUNCA se refira a si mesmo. Apenas forneça a atividade no formato JSON solicitado.`;
  
  const userPrompt = `Gere uma atividade para uma criança de ${age} anos, com ${time} de tempo disponível, para ser feita ${location}, usando ${materials}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: activitySchema,
        temperature: 1.2,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const activityData: Activity = JSON.parse(jsonText);
    
    return activityData;

  } catch (error) {
    console.error("Error generating activity from Gemini:", error);
    throw new Error("Failed to generate activity. Please try again.");
  }
};
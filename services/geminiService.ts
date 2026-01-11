
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generatePetition = async (prompt: string, files?: { base64: string; mimeType: string }[]) => {
  const ai = getAIClient();
  
  const systemInstruction = `
    Sen Mevlana Grup Hukuk Otomasyonu'nun gelişmiş yapay zeka hukuk asistanısın. 
    Avukat Mehmetcan Karaca'ya hizmet veriyorsun.
    Görevin: Türk hukuk sistemine, güncel mevzuata ve Yargıtay/Danıştay içtihatlarına uygun profesyonel hukuk dilekçeleri hazırlamaktır.
    
    Kurallar:
    1. Dilekçeler resmi, hukuki bir dille yazılmalıdır.
    2. Gerekli durumlarda (mahkeme kararı veya evrak yüklendiğinde) bu evrakları titizlikle analiz et ve dilekçeye entegre et.
    3. Dilekçe formatı: T.C. [İlgili Mahkeme/Makam], Dosya No, Davacı/Davalı Bilgileri, Konu, Açıklamalar, Hukuki Deliller, Hukuki Nedenler ve Netice-i Talep kısımlarını içermelidir.
    4. Sadece dilekçe metnini ve kısa bir açıklamayı döndür.
    5. Cevaplarında "Google", "Gemini" veya "AI" ifadelerini asla kullanma. Sen "Hukuk Otomasyon Sistemi"nin bir parçasısın.
  `;

  const contents: any[] = [{ text: prompt }];

  if (files && files.length > 0) {
    files.forEach(file => {
      contents.push({
        inlineData: {
          data: file.base64.split(',')[1] || file.base64,
          mimeType: file.mimeType
        }
      });
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: contents },
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        tools: [{ googleSearch: {} }] // For referencing recent laws/cases
      },
    });

    return {
      text: response.text || "Üzgünüm, dilekçe oluşturulurken bir hata oluştu.",
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

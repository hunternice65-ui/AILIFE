
import { GoogleGenAI, Type } from "@google/genai";
import type { Prediction } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFortune = async (dob: string): Promise<Prediction> => {
  const prompt = `ในฐานะนักพยากรณ์ผู้เชี่ยวชาญ, จงทำนายดวงชะตาสำหรับบุคคลที่เกิดในวันที่ ${dob}. 
  โปรดระบุราศีตามวันเกิดของผู้ใช้, ให้คำแนะนำโดยรวมประจำวัน (สรุปสั้นๆ), และให้คำทำนายที่ครอบคลุมใน 5 ด้านต่อไปนี้: การเงิน, การงาน, ความรัก, โชคลาภ, และสุขภาพ. 
  นอกจากนี้ ให้ระบุสีมงคล (เช่น 'สีแดง') และเลขนำโชค (เลขตัวเดียวหรือหลายตัวก็ได้) สำหรับวันนี้.
  คำทำนายแต่ละด้านและคำแนะนำควรมีความยาวประมาณ 2-3 ประโยคและเป็นภาษาไทยที่สละสลวย.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              finance: {
                type: Type.STRING,
                description: "คำทำนายด้านการเงิน"
              },
              work: {
                type: Type.STRING,
                description: "คำทำนายด้านการงาน"
              },
              love: {
                type: Type.STRING,
                description: "คำทำนายด้านความรัก"
              },
              luck: {
                type: Type.STRING,
                description: "คำทำนายด้านโชคลาภ"
              },
              health: {
                type: Type.STRING,
                description: "คำทำนายด้านสุขภาพ"
              },
              luckyColor: {
                type: Type.STRING,
                description: "สีมงคลประจำวัน"
              },
              luckyNumber: {
                type: Type.STRING,
                description: "เลขนำโชคประจำวัน"
              },
              zodiac: {
                type: Type.STRING,
                description: "ราศีของผู้ใช้"
              },
              dailyAdvice: {
                type: Type.STRING,
                description: "คำแนะนำโดยรวมประจำวัน"
              }
            },
            required: ["finance", "work", "love", "luck", "health", "luckyColor", "luckyNumber", "zodiac", "dailyAdvice"]
          },
          temperature: 0.8,
          topP: 0.9,
        },
      });

    if (!response.text) {
        throw new Error("API response is empty.");
    }

    const jsonText = response.text.trim();
    const predictionData = JSON.parse(jsonText);
    
    return predictionData as Prediction;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get fortune prediction.");
  }
};

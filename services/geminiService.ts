
import type { Prediction } from '../types';

// ฐานข้อมูลคำทำนายเบื้องต้น
const fortunes = {
  finance: [
    "การเงินช่วงนี้มีความมั่นคงสูง มีเกณฑ์ได้รับเงินก้อนเล็กๆ จากการเสี่ยงโชค",
    "รายจ่ายค่อนข้างเยอะ ควรวางแผนการเงินให้ดีก่อนตัดสินใจซื้อของชิ้นใหญ่",
    "มีโชคลาภจากคนใกล้ชิด รายได้หลักยังคงไหลมาเทมาอย่างต่อเนื่อง",
    "ระวังการถูกหยิบยืมเงินในช่วงนี้ อาจจะได้คืนยากกว่าที่คิด"
  ],
  work: [
    "งานที่ทำอยู่จะประสบความสำเร็จอย่างดี ได้รับคำชมจากผู้ใหญ่และเพื่อนร่วมงาน",
    "อาจมีอุปสรรคเล็กน้อยเข้ามาท้าทาย แต่คุณจะสามารถผ่านมันไปได้ด้วยสติ",
    "เป็นช่วงที่เหมาะกับการเริ่มต้นโปรเจกต์ใหม่ๆ หรือการสมัครงานใหม่",
    "ความขยันของคุณจะเริ่มส่งผลให้เห็นเด่นชัดในเร็ววันนี้ เตรียมรับข่าวดี"
  ],
  love: [
    "คนโสดมีเกณฑ์จะได้พบคนถูกใจจากการเดินทางหรือการทำงาน",
    "ความรักสดใส คนมีคู่จะมีความเข้าใจกันมากขึ้นและมีแผนการในอนาคตร่วมกัน",
    "ควรระวังเรื่องอารมณ์และการใช้คำพูดกับคนรักในช่วงนี้",
    "เสน่ห์แรงเป็นพิเศษ มีคนเข้ามาทำความรู้จักหลายคนในช่วงนี้"
  ],
  luck: [
    "โชคลาภจะมาทางทิศตะวันออก ลองเสี่ยงโชคเล็กๆ น้อยๆ พอหอมปากหอมคอ",
    "ดวงกำลังพุ่งแรง จะหยิบจับอะไรก็เป็นเงินเป็นทองไปหมด",
    "โชคลาภจากการทำงานจะโดดเด่นกว่าการเสี่ยงดวง",
    "ช่วงนี้ดวงการเสี่ยงโชคยังไม่โดดเด่น เน้นการลงแรงจะเห็นผลมากกว่า"
  ],
  health: [
    "สุขภาพร่างกายแข็งแรงดี แต่ควรพักผ่อนให้เพียงพอและดื่มน้ำมากๆ",
    "ระวังเรื่องอาการปวดเมื่อยบริเวณคอ บ่า ไหล่ จากการทำงานหนักเกินไป",
    "ควรหาเวลาไปออกกำลังกายบ้าง เพื่อเสริมสร้างภูมิคุ้มกันให้ร่างกาย",
    "ระวังเรื่องระบบทางเดินอาหารและการเลือกรับประทานอาหารที่สะอาด"
  ],
  advice: [
    "วันนี้ควรตั้งสติก่อนตัดสินใจเรื่องสำคัญ แล้วทุกอย่างจะราบรื่น",
    "การแบ่งปันน้ำใจให้ผู้อื่นจะช่วยเสริมดวงชะตาของคุณให้ดีขึ้น",
    "ลองมองหาแรงบันดาลใจใหม่ๆ รอบตัว จะช่วยให้ชีวิตมีพลังมากขึ้น",
    "ยิ้มรับวันใหม่ด้วยใจที่เป็นสุข แล้วสิ่งดีๆ จะไหลเข้ามาหาคุณเอง"
  ],
  colors: ["สีน้ำเงิน", "สีชมพู", "สีส้ม", "สีทอง", "สีเขียวมิ้นต์", "สีแดงอ่อน", "สีม่วงพาสเทล"],
  numbers: ["1", "5", "8", "9", "24", "36", "45", "78", "99"]
};

// ฟังก์ชันหาคำทำนายตาม Seed (เพื่อให้ผลคงที่สำหรับวันเกิดนั้นๆ ในวันนี้)
const getBySeed = (list: string[], seed: number) => {
  return list[seed % list.length];
};

// ฟังก์ชันคำนวณราศี
const calculateZodiac = (day: number, month: number): string => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "เมษ";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "พฤษภ";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "เมถุน";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "กรกฎ";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "สิงห์";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "กันย์";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "ตุลย์";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "พิจิก";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "ธนู";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "มังกร";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "กุมภ์";
  return "มีน";
};

export const getFortune = async (dob: string): Promise<Prediction> => {
  // จำลองความหน่วงเพื่อให้ดูเหมือนกำลังประมวลผล
  await new Promise(resolve => setTimeout(resolve, 1500));

  const birthDate = new Date(dob);
  const today = new Date();
  
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  // สร้าง Seed จากวันเกิด + วันที่ปัจจุบัน
  const seed = day + month + year + today.getDate() + today.getMonth();

  const prediction: Prediction = {
    zodiac: calculateZodiac(day, month),
    finance: getBySeed(fortunes.finance, seed),
    work: getBySeed(fortunes.work, seed + 1),
    love: getBySeed(fortunes.love, seed + 2),
    luck: getBySeed(fortunes.luck, seed + 3),
    health: getBySeed(fortunes.health, seed + 4),
    dailyAdvice: getBySeed(fortunes.advice, seed + 5),
    luckyColor: getBySeed(fortunes.colors, seed + 6),
    luckyNumber: getBySeed(fortunes.numbers, seed + 7)
  };

  return prediction;
};

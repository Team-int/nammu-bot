export const messages: string[] = [
  '사실 원래 NAMU로 지을려고 했어요',
  '아이콘은 음절 마다 끊어 적은거랍니다',
  '나무 라는 이름은 계란을 삶다가 생각해냈어요',
];

export default function generateMessage() {
  const random = Math.floor(Math.random() * messages.length);
  return messages[random];
}

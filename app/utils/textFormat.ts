// formatTextWithLineBreaks : 줄바꿈 처리를 위한 함수
export const formatTextWithLineBreaks = (text: string) => {
  return text
    .replace(/,/g, ",<br />") // , 뒤에 줄바꿈
    .replace(/\./g, ".<br />"); // . 뒤에 줄바꿈
};

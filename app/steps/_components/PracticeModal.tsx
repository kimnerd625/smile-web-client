import WebcamComponent from "@/app/_components/WebcamComponent";

// ModalContent 컴포넌트 분리
const PracticeModal = ({
  selectedEmoji,
  setIsSuccess,
  handleModalClose,
}: {
  selectedEmoji: string;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 text-center">
      <span className="text-[14px] text-[#FF8C4A] font-semibold">잠깐!</span>
      <span className="text-[14px] text-[#FF8C4A] font-semibold">
        선택지를 고를 때,
      </span>
      <span className="text-[14px] text-[#FF8C4A] font-semibold">
        이모티콘과 똑같은 표정을 지어야
      </span>
      <span className="text-[14px] text-[#FF8C4A] font-semibold">
        넘어갈 수 있어요!
      </span>
      <div className="text-4xl mb-4">{selectedEmoji}</div>
      <WebcamComponent setIsSuccess={setIsSuccess} />
    </div>
  );
};

export default PracticeModal;

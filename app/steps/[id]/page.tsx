"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import { formatTextWithLineBreaks } from "@/app/utils/textFormat";
import WebcamComponent from "@/app/_components/WebcamComponent";
import Modal from "../_components/Modal";

const montserrat = Montserrat({ subsets: ["latin"] });

const messages = [
  {
    id: 1,
    text: "학원은 오랜만에 고등학교 같지 지민이를 만났고, 반가운 대화를 나누게 되었다. 지민이가 어제 있던 일을 조잘조잘 공유한다.",
    type: "system",
  },
  { id: 2, text: "나 어제 뭐 먹었는지 알아?", type: "user" },
  {
    id: 3,
    text: "그렇게 먹고 싶어던 투움바 파스타를 먹었어! 너무 행복하더라~!",
    type: "user",
  },
];

const responses = [
  { id: 1, text: "오 행복했구나 좋았겠다", emoji: "😊" },
  { id: 2, text: "너 투움바 파스타 좋아했구나?", emoji: "🙂" },
  { id: 3, text: "난 투움바 파스타 싫어해", emoji: "😕" },
  { id: 4, text: "안 궁금한데...", emoji: "😒" },
];

export default function MissionPage({ params }: { params: { id: string } }) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showResponses, setShowResponses] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedEmoji, setSelectedEmoji] = useState<string>(""); // 선택된 이모지 저장
  const [isSuccess, setIsSuccess] = useState(false); // 성공 여부
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 저장

  const { id } = params;

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev.length < messages.length) {
          return [...prev, messages[prev.length].id];
        } else if (!showResponses) {
          setShowResponses(true);
          clearInterval(timer);
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResponses]);

  // 성공 시 모달 닫기 및 성공 메시지 표시
  useEffect(() => {
    if (isSuccess) {
      handleModalClose(); // 성공하면 모달을 닫음
    }
  }, [isSuccess]);

  const handleResponseClick = (id: number, emoji: string) => {
    setSelectedResponse(id);
    setSelectedEmoji(emoji); // 선택된 이모지 저장
    setShowModal(true); // 모달 열기
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      setSuccessMessage("축하합니다! 성공적으로 완료되었습니다.");
    }
  };

  return (
    <main className="py-8 px-4 relative h-screen bg-gradient-to-b from-[#F4EDE9] to-[#F6E3D8] font-sans">
      <h2
        className={`${montserrat.className} text-[18px] font-semibold tracking-wide leading-snug text-[#FF8C4A]`}
      >
        MISSON {id}
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {messages.map(
            (message) =>
              visibleMessages.includes(message.id) && (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`text-[#262519] font-semibold text-sm tracking-tight leading-relaxed px-5 py-[10px] rounded-[20px] max-w-[80%] bg-white shadow-md rounded-bl-none ${
                    message.type === "system"
                      ? "py-4 px-0 text-sm tracking-tight leading-relaxed text-[#464646] font-normal bg-transparent shadow-none max-w-[100%]"
                      : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: formatTextWithLineBreaks(message.text),
                  }}
                />
              )
          )}
        </AnimatePresence>
      </div>

      {showResponses && (
        <div className="mt-12 space-y-2">
          <AnimatePresence>
            {responses.map((response) => (
              <div key={response.id} className="flex items-center justify-end">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: response.id * 0.1 }}
                  onClick={() =>
                    handleResponseClick(response.id, response.emoji)
                  } // 이모지 전달
                  className={`p-3 rounded-[12px] text-sm tracking-tight leading-relaxed max-w-[80%] shadow-md font-semibold ml-auto ${
                    selectedResponse === response.id
                      ? "bg-[#EA6C23] text-white"
                      : "bg-[#FEA06A] text-white"
                  } flex items-center justify-between`}
                  disabled={selectedResponse !== null}
                >
                  <span>{response.text}</span>
                </motion.button>
                <span className="ml-2 text-2xl">{response.emoji}</span>
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <Modal onClose={handleModalClose}>
          <div className="flex flex-col justify-center items-center gap-1 text-center">
            <span className="text-[14px] text-[#FF8C4A] font-semibold">
              잠깐!
            </span>
            <span className="text-[14px] text-[#FF8C4A] font-semibold">
              선택지를 고를 때,
            </span>
            <span className="text-[14px] text-[#FF8C4A] font-semibold">
              이모티콘과 똑같은 표정을 지어야
            </span>
            <span className="text-[14px] text-[#FF8C4A] font-semibold">
              넘어갈 수 있어요!
            </span>
            <div className="text-4xl mb-4">{selectedEmoji}</div>{" "}
            {/* 이모지 크기 축소 */}
            <WebcamComponent setIsSuccess={setIsSuccess} />{" "}
            {/* 캠과 표정 인식 컴포넌트 */}
          </div>
        </Modal>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
          {successMessage}
        </div>
      )}
    </main>
  );
}

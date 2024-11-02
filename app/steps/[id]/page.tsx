"use client";

import { toast } from "sonner";
import { Montserrat } from "next/font/google";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Modal from "../_components/Modal";
import PracticeModal from "../_components/PracticeModal";
import { formatTextWithLineBreaks } from "@/app/utils/textFormat";

// Montserrat 폰트 적용 - MISSION 부분 및 숫자 부분
const montserrat = Montserrat({ subsets: ["latin"] });

/**
 * 미션 절차 메시지
 * TODO : 하드코딩 된 부분 Firebase 저장 및 연동
 * systemMessages
 * userMessages
 * responses
 */
const systemMessages = [
  {
    id: 1,
    text: "희연은 오랜만에 고등학교 친구 지민이를 만났고, 반가운 대화를 나누게 되었다. 지민이가 어제 있던 일을 조잘조잘 공유한다.",
    type: "system",
  },
];
const userMessages = [
  { id: 2, text: "나 어제 뭐 먹었는지 알아?", type: "user" },
  {
    id: 3,
    text: "그렇게 먹고 싶어던 투움바 파스타를 먹었어! 너무 행복하더라~!",
    type: "user",
  },
];
const responses = [
  { id: 1, text: "오 행복했구나! 좋았겠다~", emoji: "😊" },
  { id: 2, text: "너 투움바 파스타 좋아했구나?", emoji: "🙂" },
  { id: 3, text: "난 투움바 파스타 싫어해.", emoji: "😕" },
  { id: 4, text: "안 궁금한데...", emoji: "😒" },
];
export default function MissionScreen({ params }: { params: { id: string } }) {
  const [visibleSystemMessages, setVisibleSystemMessages] = useState<number[]>(
    []
  );
  const [visibleUserMessages, setVisibleUserMessages] = useState<number[]>([]);
  const [showResponses, setShowResponses] = useState(false);

  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [additionalMessage, setAdditionalMessage] = useState<boolean>(false); // 새로운 메시지를 추가할 상태

  const { id } = params;

  // situationMessage 출력 - 애니메이션 적용
  useEffect(() => {
    const systemTimer = setTimeout(() => {
      setVisibleSystemMessages((prev) => {
        if (prev.length < systemMessages.length) {
          return [...prev, systemMessages[prev.length].id];
        }
        return prev;
      });
    }, 1000);

    return () => clearTimeout(systemTimer);
  }, []);

  // userMessage 출력 - 애니메이션 적용 (situationMessage 출력 후)
  useEffect(() => {
    if (visibleSystemMessages.length === systemMessages.length) {
      const userTimer = setInterval(() => {
        setVisibleUserMessages((prev) => {
          if (prev.length < userMessages.length) {
            return [...prev, userMessages[prev.length].id];
          } else if (!showResponses) {
            setShowResponses(true);
            clearInterval(userTimer);
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(userTimer);
    }
  }, [visibleSystemMessages, showResponses]);

  // isSuccess일 때, 자동으로 모달 닫기 및 새로운 메시지 추가
  useEffect(() => {
    if (isSuccess) {
      handleModalClose();
      setTimeout(() => {
        setAdditionalMessage(true); // 성공 후 새로운 메시지 표시
      }, 1000); // 모달 닫힌 후 1초 후에 새로운 메시지 애니메이션
    }
  }, [isSuccess]);

  // handleResponseClick : 응답 버튼 클릭 시 이모지와 함께 모달 표시
  const handleResponseClick = (id: number, emoji: string) => {
    setSelectedResponse(id);
    setSelectedEmoji(emoji);
    setShowModal(true);
  };

  // handleModalClose : 모달 닫기
  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      toast.success("응답에 맞는 표정 짓기에 성공했어요! :)");
    }
  };

  return (
    <main className="py-8 px-4 relative h-screen bg-gradient-to-b from-[#F4EDE9] to-[#F6E3D8] font-sans">
      <h2
        className={`${montserrat.className} text-[18px] font-semibold tracking-wide leading-snug text-[#FF8C4A] mb-4`}
      >
        MISSON {id}
      </h2>
      <div className="space-y-4">
        {/* 상황 메시지 출력 */}
        <AnimatePresence>
          {systemMessages.map(
            (message) =>
              visibleSystemMessages.includes(message.id) && (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start mb-8"
                >
                  {/* 선 부분 */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="mr-4 rounded-full"
                    style={{
                      borderLeft: "3px solid #FF8C4A",
                      minHeight: "70px",
                    }}
                  />
                  {/* 메시지 부분 */}
                  <div
                    className="text-[#464646] font-normal text-sm tracking-tight leading-relaxed bg-transparent max-w-[100%]"
                    dangerouslySetInnerHTML={{
                      __html: formatTextWithLineBreaks(message.text),
                    }}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* 사용자 메시지 출력 */}
        <AnimatePresence>
          {userMessages.map(
            (message) =>
              visibleUserMessages.includes(message.id) && (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#262519] font-semibold text-sm tracking-tight leading-relaxed px-5 py-[10px] rounded-[20px] max-w-[80%] bg-white shadow-lg rounded-bl-none"
                  dangerouslySetInnerHTML={{
                    __html: formatTextWithLineBreaks(message.text),
                  }}
                />
              )
          )}
        </AnimatePresence>
      </div>

      {/* 응답 메시지 출력 */}
      {showResponses && (
        <div className="mt-8 space-y-2">
          <AnimatePresence>
            {responses.map((response) => (
              <div key={response.id} className="flex items-center justify-end">
                {(selectedResponse === null ||
                  selectedResponse === response.id) && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: response.id * 0.1 }}
                    onClick={() =>
                      handleResponseClick(response.id, response.emoji)
                    }
                    className={`p-3 rounded-[12px] text-sm tracking-tight leading-relaxed max-w-[80%] shadow-lg font-semibold ml-auto ${
                      selectedResponse === response.id
                        ? "bg-[#EA6C23] text-white"
                        : "bg-[#FEA06A] text-white"
                    } flex items-center justify-between ${
                      selectedResponse === response.id && isSuccess
                        ? "bg-[#EA6C23] rounded-br-none"
                        : ""
                    }`}
                    disabled={selectedResponse !== null}
                  >
                    <span>{response.text}</span>
                  </motion.button>
                )}
                {!isSuccess && (
                  <span
                    className={`ml-2 text-2xl ${isSuccess ? "hidden" : ""}`}
                  >
                    {response.emoji}
                  </span>
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 새로운 메시지 추가 */}
      {additionalMessage && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#262519] font-semibold text-sm tracking-tight leading-relaxed px-5 py-[10px] rounded-[20px] max-w-[80%] bg-white shadow-lg rounded-bl-none"
          >
            <p>
              응! 떠올리기만 해도 좋다 ☺️ 너는 크림이랑 토마토 중 어떤
              취향이지?!
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {showModal && (
        <Modal onClose={handleModalClose}>
          <PracticeModal
            selectedEmoji={selectedEmoji}
            setIsSuccess={setIsSuccess}
            handleModalClose={handleModalClose}
          />
        </Modal>
      )}
    </main>
  );
}

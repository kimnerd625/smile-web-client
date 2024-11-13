"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

import MessageArrowIcon from "@/public/icons/icon-message-arrow.svg";
import HamburgerIcon from "@/public/icons/icon-hamburger.svg";
import HeartIcon from "@/public/icons/icon-heart.svg";
import GoalIcon from "@/public/icons/icon-goal.svg";
import SmileStartIcon from "@/public/icons/icon-smile-start.svg";
import EmotionModal from "./_sections/EmotionModal";

const montserrat = Montserrat({ subsets: ["latin"] });

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const handleEmotionButtonClick = () => {
    setIsEmotionModalOpened(true);
    setIsDailyEmotionSuccess(false);
  };

  const handleMissionButtonClick = () => {
    router.push("/mission");
  };

  const [isEmotionModalOpened, setIsEmotionModalOpened] =
    useState<boolean>(false);
  const [isDailyEmotionSuccess, setIsDailyEmotionSuccess] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "안녕하세요!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // ref 생성
  const inputRef = useRef<HTMLInputElement>(null); // input ref 생성

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // 메시지가 업데이트될 때마다 스크롤
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus(); // 페이지 로드 시 input에 포커스
  }, []);

  useEffect(() => {
    if (isDailyEmotionSuccess) {
      const newMessage: Message = {
        sender: "bot",
        text: "저에게 예쁜 미소를 만들어 줘서 정말 고마워요!",
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [isDailyEmotionSuccess]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (data.botResponse) {
        const botMessage: Message = { sender: "bot", text: data.botResponse };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "오류가 발생했습니다. 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <main className="relative flex flex-col justify-start items-center w-full h-screen bg-gradient-to-b from-[#FFF6F3] to-[#FFE4D6] pt-3 pb-5 pl-7 pr-5">
      {/* 아바타 섹션 */}
      <section className="absolute bottom-0 flex-1 overflow-y-hidden">
        <div className="relative w-[320px] h-[520px]">
          <Image
            src="/images/avatar_home.png"
            alt="Avatar_Home"
            width={320}
            height={600}
            className="object-cover"
            priority
          />
        </div>
      </section>
      {/* 친밀도 바 & 햄버거 섹션 */}
      <section className="w-full flex flex-row justify-between items-center gap-[18px]">
        <div className="relative flex-1 h-[18px] rounded-[40px] bg-[#FFF6F3] shadow-[0_0_4px_rgba(255,188,150,0.3),inset_0_0_3px_rgba(255,188,150,0.2),0_0_8px_rgba(255,188,150,0.2),0_0_20px_rgba(255,188,150,0.15),0_0_40px_rgba(255,188,150,0.1)]">
          <div className="w-16 h-full bg-[#FFBC96] rounded-[40px]"></div>
          <div className="flex flex-row justify-center items-center gap-[6px] absolute top-[26px] left-[6px]">
            <HeartIcon width={14} height={11} />
            <span
              className={`${montserrat.className} text-[#FF8C4A] font-semibold text-sm`}
            >
              1
            </span>
          </div>
        </div>
        <HamburgerIcon width={34} height={34} />
      </section>
      {/* 미션 버튼 섹션 */}
      <section className="mt-12 w-full flex flex-row justify-between items-center">
        <div
          onClick={handleEmotionButtonClick}
          className="cursor-pointer relative"
        >
          <SmileStartIcon width={64} height={64} />
          <div className="absolute bottom-0 -right-[54px] bg-white px-2 pt-0.5 pb-1 bg-opacity-80 rounded-tl-full rounded-r-full whitespace-nowrap">
            <span className="text-[10px] text-[#FF8C4A]">미소 지어주기</span>
          </div>
        </div>
        <div
          onClick={handleMissionButtonClick}
          className="cursor-pointer bg-white rounded-[12px] px-[13px] py-[9px]"
        >
          <GoalIcon width={48} height={26} />
        </div>
      </section>
      {/* 채팅 섹션 */}
      <section className="flex flex-col py-4 space-y-4 overflow-y-auto justify-end flex-1 w-full mb-[36px] ">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`py-[10px] px-5 rounded-[20px] max-w-[100%] ${
                message.sender === "user"
                  ? "self-end bg-[#FD9F6A] text-white rounded-br-none"
                  : "self-start bg-[#FFF6F3] text-[#262519] rounded-bl-none"
              } shadow-lg font-semibold text-sm tracking-tight leading-relaxed`}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {/* 스크롤 포지션을 위한 빈 div */}
        <div ref={messagesEndRef} />
      </section>
      {/* 채팅 입력 섹션 */}
      <section className="absolute bottom-0 w-full px-4 pb-5">
        <form className="relative w-full" onSubmit={handleSend}>
          <input
            type="text"
            ref={inputRef} // input 요소에 ref 추가
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지"
            className="w-full bg-white bg-opacity-60 backdrop-blur-sm border-0.3 border-[#C5C5C5] rounded-3xl px-6 py-3.5 pr-12 font-semibold text-[#908D85] placeholder-gray-400 text-sm focus:border-[#FFBC96] focus:outline-none focus:ring-none transition-shadow"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#FF8C4A] hover:bg-[#FFBC96]/50 rounded-full transition-colors"
          >
            <MessageArrowIcon width={26} height={26} />
          </button>
        </form>
      </section>
      {isEmotionModalOpened && (
        <EmotionModal
          isDailyEmotionSuccess={isDailyEmotionSuccess}
          setIsEmotionModalOpened={setIsEmotionModalOpened}
          setIsDailyEmotionSuccess={setIsDailyEmotionSuccess}
        />
      )}
    </main>
  );
}

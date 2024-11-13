"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import NeutralIcon from "@/public/icons/icon-neutral.svg";
import SmileIcon from "@/public/icons/icon-smile.svg";
import SmilerIcon from "@/public/icons/icon-smiler.svg";
import RightDashIcon from "@/public/icons/icon-dash-right.svg";
import WebcamComponent from "@/app/_components/WebcamComponent";

// EmotionModalProps 인터페이스 정의
interface EmotionModalProps {
  isDailyEmotionSuccess: boolean;
  setIsEmotionModalOpened: (isEmotionModalOpened: boolean) => void;
  setIsDailyEmotionSuccess: (isDailyEmotionSuccess: boolean) => void;
}

const EmotionModal: React.FC<EmotionModalProps> = ({
  isDailyEmotionSuccess,
  setIsEmotionModalOpened,
  setIsDailyEmotionSuccess,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsEmotionModalOpened(false);
        setIsDailyEmotionSuccess(true);
      }, 1500);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [isSuccess, setIsEmotionModalOpened, setIsDailyEmotionSuccess]);

  return (
    <section className="absolute top-0 left-0 w-full min-h-full bg-[#FF8C4A] px-9 flex flex-col justify-between">
      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            className="w-full flex flex-col justify-center items-center h-full flex-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="py-[44px] px-[68.5px] rounded-full"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse, white 15%, #FF8C4A 65%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-[#FF8C4A] font-bold text-xl">성공했어요!</h3>
            </motion.div>
          </motion.div>
        ) : (
          <div>
            <div className="rounded-2xl w-full mt-[120px] border-dashed border-2 border-[#FFBC96] flex flex-row justify-center items-center gap-x-5 px-9 py-5">
              <NeutralIcon width={40} height={40} />
              <RightDashIcon width={20} height={16} />
              <SmileIcon width={40} height={40} />
              <RightDashIcon width={20} height={16} />
              <SmilerIcon width={40} height={40} />
            </div>
            <div className="mt-10 flex flex-col justify-center items-center gap-y-3">
              <h2 className="text-white text-2xl font-semibold">
                희연에게 밝은 웃음을 안겨주세요!
              </h2>
              <span className="text-white text-sm font-medium">
                애정도를 크게 채울 수 있어요.
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
      <div className="mb-[86px]">
        {!isDailyEmotionSuccess && (
          <WebcamComponent setIsSuccess={setIsSuccess} />
        )}
      </div>
    </section>
  );
};

export default EmotionModal;

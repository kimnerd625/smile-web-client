"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

import MessageArrowIcon from "@/public/icons/icon-message-arrow.svg";
import HamburgerIcon from "@/public/icons/icon-hamburger.svg";
import HeartIcon from "@/public/icons/icon-heart.svg";
import GoalIcon from "@/public/icons/icon-goal.svg";
import SmileStartIcon from "@/public/icons/icon-smile-start.svg";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function HomeScreen() {
  const router = useRouter();

  const handleInputClick = () => {
    router.push("/chat"); // 클릭 시 /chat으로 이동
  };

  const handleMissionButtonClick = () => {
    router.push("/mission");
  };

  return (
    <main className="relative flex flex-col justify-start items-center w-full h-screen bg-gradient-to-b from-[#FFF6F3] to-[#FFE4D6] pt-3 pb-5 pl-7 pr-5">
      {/* 아바타 섹션 */}
      <section className="absolute bottom-0 flex-1 overflow-y-hidden">
        <div className="relative w-[269px] h-[500px]">
          <Image
            src="/images/avatar_home.png"
            alt="Avatar_Home"
            width={269}
            height={574}
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
      <section className="mt-6 w-full flex flex-row justify-end items-center">
        <div
          onClick={handleMissionButtonClick}
          className="cursor-pointer bg-white rounded-[12px] px-[13px] py-[9px]"
        >
          <GoalIcon width={48} height={26} />
        </div>
      </section>
      {/* 미소 지어주기 섹션 */}
      <section className="mt-[46px] w-full flex flex-row justify-start items-center">
        <SmileStartIcon width={64} height={64} />
      </section>
      {/* 채팅으로 넘어가기 섹션 */}
      <div className="absolute bottom-0 w-full px-4 pb-5">
        <form className="relative w-full" onClick={handleInputClick}>
          <input
            type="text"
            placeholder="메시지"
            className="w-full bg-white bg-opacity-60 backdrop-blur-sm border-0.3 border-[#C5C5C5] rounded-3xl px-6 py-3.5 pr-12 font-semibold text-[#908D85] placeholder-gray-400 text-sm focus:border-[#FFBC96] focus:outline-none focus:ring-none transition-shadow"
            readOnly
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#FF8C4A] hover:bg-[#FFBC96]/50 rounded-full transition-colors">
            <MessageArrowIcon width={26} height={26} />
          </button>
        </form>
      </div>
    </main>
  );
}

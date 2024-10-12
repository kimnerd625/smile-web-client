"use client";

import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function MissionSelectSection() {
  const router = useRouter();
  const steps = Array.from({ length: 15 }, (_, i) => i + 1);

  const handleStepClick = (step: number) => {
    console.log(`${step}단계가 클릭되었습니다.`);
    // 클릭 시 해당 단계로 이동하도록 설정
    router.push(`/steps/${step}`);
  };

  return (
    <main className="h-screen w-full bg-gradient-to-b from-[#F4EDE9] to-[#F6E3D8] overflow-hidden font-sans">
      <div className="h-full flex flex-col justify-between px-[30px] py-12 gap-y-12">
        <div className="flex-1 flex flex-wrap justify-center items-center gap-4">
          {steps.map((step) => (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              className="text-[#FF8C4A] bg-[#FFF7F2] hover:bg-orange-100
              border-2 border-[#FFBC96] rounded-[12px] font-bold
              transition-all duration-200 ease-in-out"
              style={{
                width: "84px",
                height: "40px",
              }}
            >
              {step}
            </button>
          ))}
        </div>
        <div className="w-full text-right">
          <h2
            className={`${montserrat.className} text-[#FF8C4A] text-[28px] font-bold tracking-wide leading-snug`}
          >
            MISSON
          </h2>
        </div>
      </div>
    </main>
  );
}

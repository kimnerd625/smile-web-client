"use client";

import React, { useEffect } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
});

export default function OnboardingScreen() {
  const router = useRouter();

  const handleOnboardingComplete = () => {
    document.cookie = "onboardingComplete=true; path=/";
    router.push("/");
  };

  useEffect(() => {
    setTimeout(() => {
      handleOnboardingComplete();
    }, 1500);
  }, []);

  return (
    <html lang="ko">
      <body className={`${Pretendard.className} bg-[#f7f7f7] relative`}>
        <div className="w-full min-h-screen flex justify-center items-center relative">
          <div className="w-full min-h-screen md:w-[393px] bg-[#FF8C4A] shadow-md flex flex-col justify-center items-center">
            <h2>😄💬</h2>
            {/* <button onClick={handleOnboardingComplete}>Get Started</button> */}
          </div>
        </div>
      </body>
    </html>
  );
}

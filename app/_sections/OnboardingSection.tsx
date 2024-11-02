"use client";

import React, { useEffect } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

const Pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
});

export default function OnboardingScreen() {
  const router = useRouter();

  const handleOnboardingComplete = async () => {
    document.cookie = "onboardingComplete=true; path=/";
    await router.push("/home");
    window.location.reload();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleOnboardingComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${Pretendard.className} bg-[#f7f7f7] relative w-full min-h-screen flex justify-center items-center`}
    >
      <div className="w-full min-h-screen md:w-[393px] bg-[#FF8C4A] shadow-md flex flex-col justify-center items-center">
        <h2>😄💬</h2>
      </div>
    </div>
  );
}

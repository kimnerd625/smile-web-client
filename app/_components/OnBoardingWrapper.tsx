"use client";

import React, { useEffect, useState } from "react";
import OnboardingScreen from "../_sections/OnboardingSection";

export default function OnboardingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    // 쿠키를 확인하고 상태 업데이트
    const cookies = document.cookie.split("; ");
    const onboardingCookie = cookies.find((cookie) =>
      cookie.startsWith("onboardingComplete=")
    );
    setOnboardingComplete(onboardingCookie === "onboardingComplete=true");
  }, []);

  return onboardingComplete ? <>{children}</> : <OnboardingScreen />;
}

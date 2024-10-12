import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const Pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  title: "조현병 환자를 위한 표정 훈련 서비스",
  description: "조현병 환자를 위한 표정 훈련 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.className} bg-[#f7f7f7] relative`}>
        <Toaster position="top-center" richColors />
        <div className="w-full min-h-screen flex justify-center items-center relative">
          <div className="w-full md:w-[375px] bg-white shadow-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

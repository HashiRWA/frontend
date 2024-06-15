"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  if (!show) return null;

  return (
    <section className="fixed top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[#c5e4e7]">
      <Image
        src="/logo.svg"
        className="spin-rest"
        height={100}
        width={100}
        alt="HashiRWA"
      />

      <Image
        src="/fake.png"
        className="-mt-10 opacity-30 blur-sm"
        height={50}
        width={200}
        alt="HashiRWA"
      />
    </section>
  );
}

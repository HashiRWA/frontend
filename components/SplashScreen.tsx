"use client"; 
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }, []);

  if (!show) return null;

  return (
    <section className="w-screen h-screen fixed top-0 z-40 bg-[#91b9b5] flex flex-col justify-center gap-2 items-center ">
        <Image
            src="/logo.svg"
            className="spin-rest"
            height={100}
            width={100}
            alt="HashiRWA"
        />

        <Image
            src="/fake.png"
            className="opacity-30 blur-sm -mt-10"
            height={50}
            width={200}
            alt="HashiRWA"
        />
    </section>
  );
}
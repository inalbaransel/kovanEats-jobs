"use client";

import { useEffect } from "react";

export default function ConsoleSignature() {
  useEffect(() => {
    const header = "KovanEats Kariyer Portalı";
    const developer = "Developed by Baransel";
    const warning = "Burası geliştiriciler için ayrılmış bir alandır. Bilmediğiniz komutları buraya yapıştırmayınız.";

    console.log(
      `%c${header}\n%c${developer}\n\n%c${warning}`,
      "color: red; font-size: 28px; font-weight: bold; font-family: sans-serif;",
      "color: #555; font-size: 14px; font-weight: 500; font-family: sans-serif;",
      "color: red; font-size: 14px; font-weight: normal; font-family: sans-serif;"
    );
  }, []);

  return null;
}

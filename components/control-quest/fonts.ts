import { Barlow, Barlow_Condensed } from "next/font/google";

/** Display: road-sign condensed type. Text: its normal-width sibling. */
export const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--cq-font-display",
  display: "swap",
});

export const text = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--cq-font-text",
  display: "swap",
});

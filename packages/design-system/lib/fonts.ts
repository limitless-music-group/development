import { DM_Sans } from "next/font/google";
import { cn } from "./utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const fonts = cn(
  dmSans.className,
  "touch-manipulation font-sans antialiased"
);

import type { LocalFont } from "@zumer/snapdom";
import { createContext, useContext, type ReactNode } from "react";

interface FontContextType {
  fonts: LocalFont[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({
  children,
  fonts,
}: {
  children: ReactNode;
  fonts: LocalFont[];
}) {
  return (
    <FontContext.Provider value={{ fonts }}>{children}</FontContext.Provider>
  );
}

export function useFonts() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFonts must be used within a FontProvider");
  }
  return context.fonts;
}

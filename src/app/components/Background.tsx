import React from "react";
export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`bgpattern
      h-screen --dark-- dark:bg-[#3A405F] dark:text-[#E18B15] `}
    >
      {children}
    </main>
  );
}

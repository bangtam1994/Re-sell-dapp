import { ReactNode } from "react";

export const Divider = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ borderBottom: "1px solid white", width: "100%" }} />
      <span className="py-8 font-orbitron w-full text-center">{children}</span>
      <div style={{ borderBottom: "1px solid white", width: "100%" }} />
    </div>
  );
};

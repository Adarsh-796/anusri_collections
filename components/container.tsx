import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-350 mx-auto">{children}</div>;
}

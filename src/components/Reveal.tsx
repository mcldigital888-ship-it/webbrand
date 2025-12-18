"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className,
  once = true,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className || "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

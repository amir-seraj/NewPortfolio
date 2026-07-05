"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

export function PrismHighlight({ trigger }: { trigger: string }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [trigger]);
  return null;
}

"use client";

import DOMPurify from "isomorphic-dompurify";

interface TipTapContentDisplayProps {
  content: string;
  className?: string;
}

export default function TipTapContentDisplay({ content, className = "" }: TipTapContentDisplayProps) {
  // Sanitize incoming HTML to prevent XSS
  const safeHTML = DOMPurify.sanitize(content);

  return (
    <div
      className={`prose max-w-full ${className}`} // Tailwind typography
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}

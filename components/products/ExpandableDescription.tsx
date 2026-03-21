"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableDescriptionProps {
  text: string;
}

export default function ExpandableDescription({ text }: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNeedsExpansion, setIsNeedsExpansion] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Jeśli tekst zajmuje w pionie więcej niż nasz limit (ok. 280px)
      if (textRef.current.scrollHeight > 300) {
        setIsNeedsExpansion(true);
      }
    }
  }, [text]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isExpanded) {
      // Zwijanie opisu - przescroluj płynnie do kontenera z Description
      if (containerRef.current) {
        const yOffset = -120; // 120px offset na górny padding i header
        const y = containerRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsExpanded(!isExpanded);
  };

  if (!text) return null;

  return (
    <div ref={containerRef} className="relative mb-6">
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? '' : 'max-h-[280px]'}`}
      >
        <p 
          ref={textRef}
          className="leading-relaxed whitespace-pre-wrap" 
          style={{ color: 'var(--warm-gray)' }}
        >
          {text}
        </p>
        
      </div>

      {isNeedsExpansion && (
        <button
          onClick={handleToggle}
          className="mt-2 flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity focus:outline-none"
          style={{ color: 'var(--brown)' }}
          title={isExpanded ? "Zwiń długi opis" : "Czytaj cały opis"}
        >
          {isExpanded ? (
            <>
              <span>Zwiń opis</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span>Czytaj cały opis</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

"use client";

type SplitType = "chars" | "words" | "lines" | "both";

/**
 * Simple SplitText utility for text animation
 * Splits text into words, chars or lines for animation
 */
export class SplitText {
  element: HTMLElement;
  originalHTML: string;
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  options: SplitTextOptions;
  
  constructor(element: HTMLElement, options: SplitTextOptions = {}) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    this.options = {
      type: options.type || "chars",
      charsClass: options.charsClass || "char",
      wordsClass: options.wordsClass || "word",
      linesClass: options.linesClass || "line"
    };
    
    this.init();
  }
  
  init() {
    this.splitText();
  }
  
  splitText() {
    const { type, charsClass, wordsClass, linesClass } = this.options;
    const text = this.element.textContent || "";
    this.element.innerHTML = "";
    
    // Make sure we have string values for class names
    const charClass = charsClass || "char";
    const wordClass = wordsClass || "word";
    const lineClass = linesClass || "line";
    
    // Safely handle type
    const splitType: SplitType = type as SplitType || "chars";
    
    // Handle character splitting
    if (splitType === "chars" || splitType === "both") {
      this.splitToChars(text, charClass);
    }
    
    // Handle word splitting
    if (splitType === "words" || splitType === "both") {
      this.splitToWords(text, wordClass);
    }
    
    // Handle line splitting
    if (splitType === "lines") {
      this.splitToLines(text, lineClass);
    }
  }
  
  private splitToChars(text: string, charClass: string) {
    const chars = Array.from(text);
    
    chars.forEach(char => {
      if (char === " ") {
        const spaceSpan = document.createElement("span");
        spaceSpan.innerHTML = "&nbsp;";
        spaceSpan.style.display = "inline-block";
        this.element.appendChild(spaceSpan);
      } else {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.classList.add(charClass);
        charSpan.style.display = "inline-block";
        this.element.appendChild(charSpan);
        this.chars.push(charSpan);
      }
    });
  }
  
  private splitToWords(text: string, wordClass: string) {
    const words = text.split(" ");
    
    words.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word;
      wordSpan.classList.add(wordClass);
      wordSpan.style.display = "inline-block";
      this.element.appendChild(wordSpan);
      this.words.push(wordSpan);
      
      // Add space after each word except the last one
      if (index < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.innerHTML = "&nbsp;";
        spaceSpan.style.display = "inline-block";
        this.element.appendChild(spaceSpan);
      }
    });
  }
  
  private splitToLines(text: string, lineClass: string) {
    // This is more complex and would require layout calculations
    // For simplicity, we're not implementing this completely
    const lineSpan = document.createElement("span");
    lineSpan.textContent = text;
    lineSpan.classList.add(lineClass);
    this.element.appendChild(lineSpan);
    this.lines.push(lineSpan);
  }
  
  revert() {
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export interface SplitTextOptions {
  type?: "chars" | "words" | "lines" | "both";
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
} 
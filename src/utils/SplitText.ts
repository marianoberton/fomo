/**
 * Simple SplitText utility for GSAP animations
 * A lightweight alternative to GSAP's SplitText plugin
 */

interface SplitTextOptions {
  type: 'words' | 'chars' | 'lines';
  wordsClass?: string;
  charsClass?: string;
  linesClass?: string;
}

export class SplitText {
  private element: HTMLElement;
  private options: SplitTextOptions;
  private originalHTML: string;
  
  constructor(element: HTMLElement | null, options: SplitTextOptions) {
    if (!element) return;
    
    this.element = element;
    this.options = {
      type: 'chars',
      wordsClass: 'word',
      charsClass: 'char',
      linesClass: 'line',
      ...options
    };
    
    this.originalHTML = element.innerHTML;
    this.split();
  }
  
  split() {
    const { type, wordsClass, charsClass, linesClass } = this.options;
    const text = this.element.textContent || '';
    let html = '';
    
    if (type === 'words') {
      // Split into words
      const words = text.split(/\s+/);
      html = words
        .map(word => `<span class="${wordsClass}">${word}</span>`)
        .join(' ');
    } else if (type === 'chars') {
      // Split into characters
      html = Array.from(text)
        .map(char => char === ' ' 
          ? ' ' 
          : `<span class="${charsClass}">${char}</span>`)
        .join('');
    } else if (type === 'lines') {
      // This is a simple implementation
      // For more accurate line splitting, would need more complex logic
      const lines = text.split('\n');
      html = lines
        .map(line => `<span class="${linesClass}">${line}</span>`)
        .join('<br>');
    }
    
    this.element.innerHTML = html;
  }
  
  revert() {
    this.element.innerHTML = this.originalHTML;
  }
} 
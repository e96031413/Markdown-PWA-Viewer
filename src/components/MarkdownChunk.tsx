import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import markedKatex from 'marked-katex-extension';

interface MarkdownChunkProps {
  content: string;
}

// Configure marked with KaTeX extension
marked.use(markedKatex({
  throwOnError: false,
  displayMode: false,
  output: 'html',
  strict: false
}));

// Configure DOMPurify to allow KaTeX classes and elements
DOMPurify.addHook('afterSanitizeAttributes', function(node) {
  if (node.hasAttribute('class')) {
    const classes = node.getAttribute('class');
    if (classes && classes.match(/^(katex|math)/)) {
      // Allow KaTeX classes
      return;
    }
  }
});

const MarkdownChunk: React.FC<MarkdownChunkProps> = ({ content }) => {
  const sanitizedHtml = DOMPurify.sanitize(marked(content), {
    ADD_TAGS: ['math', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msubsup', 'mfrac', 'annotation'],
    ADD_ATTR: ['xmlns', 'encoding', 'class', 'style', 'mathvariant'],
  });
  
  return (
    <div 
      className="markdown-chunk"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default MarkdownChunk;
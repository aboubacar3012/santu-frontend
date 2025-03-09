import React, { useState } from 'react';
import { IoMdCopy, IoMdCheckmark } from 'react-icons/io';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-2 mb-4 rounded-md overflow-hidden">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-xs text-gray-200">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <>
              <IoMdCheckmark className="text-green-500" /> Copié
            </>
          ) : (
            <>
              <IoMdCopy /> Copier
            </>
          )}
        </button>
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={language as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="p-4 overflow-x-auto text-sm"
            style={{ ...style, margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;

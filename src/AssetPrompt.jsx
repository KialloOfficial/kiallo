import React, { useEffect, useRef, useState } from 'react';
import { prompts, promptLabels } from './prompts';

export default function AssetPrompt({ file, lang }) {
  const labels = promptLabels[lang];
  const text = prompts[file][lang];
  const input = useRef(null);
  const timer = useRef(null);
  const [status, setStatus] = useState('');
  useEffect(() => { setStatus(''); return () => clearTimeout(timer.current); }, [lang]);

  async function copyPrompt() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      input.current?.focus();
      input.current?.select();
      setStatus('select');
    }
    timer.current = setTimeout(() => setStatus(''), 3500);
  }

  return <details className="asset-prompt">
    <summary>{labels.title}<span aria-hidden="true">+</span></summary>
    <div className="prompt-content">
      <textarea ref={input} readOnly value={text} aria-label={labels.input} spellCheck="false" />
      <div className="prompt-toolbar"><small>{lang === 'zh' ? '按此图形态描述 · 建议搭配参考图' : 'Specific to this image · Use with reference art'}</small><button type="button" onClick={copyPrompt}>{labels.copy}</button></div>
      <span className="copy-status" role="status">{status ? labels[status] : ''}</span>
    </div>
  </details>;
}

import { ClipboardCopyIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';

interface ResultDisplayProps {
  result: {
    category: string;
    suggestion: string;
  };
}

export function ResultDisplay({
  result
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const isProductive = result.category.toLowerCase() === 'produtivo';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-200">
        Resultado da Análise
      </h2>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${isProductive ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
        {result.category}
      </span>
    </div>
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-medium text-gray-300">
          Sugestão de Resposta
        </h3>
        <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors duration-300">
          {copied ? <>
            <CheckIcon size={16} className="text-green-400" />
            <span className="text-green-400">Copiado!</span>
          </> : <>
            <ClipboardCopyIcon size={16} />
            <span>Copiar</span>
          </>}
        </button>
      </div>
      <div className="p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-200">
        <p className="whitespace-pre-line">{result.suggestion}</p>
      </div>
    </div>
  </div>;
}
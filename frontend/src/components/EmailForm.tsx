import { ChangeEvent } from 'react';
import { SendIcon, LoaderCircleIcon, FileTextIcon, EraserIcon } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface EmailFormProps {
  emailText: string;
  setEmailText: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
}

export function EmailForm({
  emailText,
  setEmailText,
  onSubmit,
  isLoading,
  onClear,
}: EmailFormProps) {

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmailText(e.target.value);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (event) => setEmailText(event.target?.result as string);
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;

        if (arrayBuffer) {
          try {
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              fullText += textContent.items.map(item => ('str' in item ? item.str : '')).join(' ') + '\n';
            }

            setEmailText(fullText);
          } catch (error) {
            //console.error("Erro ao ler o PDF:", error);
            alert("Não foi possível ler o arquivo PDF.");
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Formato de arquivo não suportado.");
    }
  };

  const hasContent = emailText.trim().length > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email-text" className="block text-sm font-medium text-gray-300">
          Texto do Email
        </label>
        <textarea
          id="email-text"
          rows={8}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
          placeholder="Cole o conteúdo do email aqui para análise..."
          value={emailText}
          onChange={handleTextChange}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="file-upload"
            className={`flex items-center gap-2 px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600 cursor-pointer'}`}
          >
            <FileTextIcon size={18} />
            <span>Carregar arquivo (.pdf ou .txt)</span>
          </label>
          <input
            type="file"
            id="file-upload"
            className="sr-only"
            accept=".txt,.pdf"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          {hasContent && !isLoading && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              title="Limpar campo"
            >
              <EraserIcon size={18} />
              <span>Limpar</span>
            </button>
          )}
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading || !hasContent}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoaderCircleIcon size={18} className="animate-spin" />
              <span>Analisando...</span>
            </>
          ) : (
            <>
              <SendIcon size={18} />
              <span>Analisar Email</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
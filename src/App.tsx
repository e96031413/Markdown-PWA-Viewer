import React, { useState, useCallback, Suspense, lazy, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Virtuoso } from 'react-virtuoso';
import { Moon, Sun, Upload, FileWarning, Trash2, FileText } from 'lucide-react';

interface FileContent {
  name: string;
  content: string;
  chunks: string[];
}

const CHUNK_SIZE = 5000;
const STORAGE_KEY = 'markdown-files';

const MarkdownChunk = lazy(() => import('./components/MarkdownChunk'));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [files, setFiles] = useState<FileContent[]>(() => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    const files = savedFiles ? JSON.parse(savedFiles) : [];
    return files.length > 0 ? files[0].name : null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const splitIntoChunks = (content: string): string[] => {
    const chunks: string[] = [];
    let currentIndex = 0;

    while (currentIndex < content.length) {
      let nextBreak = content.indexOf('\n\n', currentIndex + CHUNK_SIZE);
      if (nextBreak === -1) nextBreak = content.length;
      
      if (nextBreak - currentIndex > CHUNK_SIZE * 1.5) {
        nextBreak = content.lastIndexOf('\n', currentIndex + CHUNK_SIZE);
        if (nextBreak <= currentIndex) nextBreak = currentIndex + CHUNK_SIZE;
      }

      chunks.push(content.slice(currentIndex, nextBreak));
      currentIndex = nextBreak;
    }

    return chunks;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);
    setError(null);

    try {
      const newFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          if (!file.name.endsWith('.md')) {
            throw new Error('Only markdown files (.md) are supported');
          }

          const content = await file.text();
          const chunks = splitIntoChunks(content);
          return {
            name: file.name,
            content,
            chunks
          };
        })
      );

      setFiles((prev) => [...prev, ...newFiles]);
      if (newFiles.length > 0) {
        setSelectedFile(newFiles[0].name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while reading the file');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    if (selectedFile === fileName) {
      const remainingFiles = files.filter((file) => file.name !== fileName);
      setSelectedFile(remainingFiles.length > 0 ? remainingFiles[0].name : null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md']
    }
  });

  const selectedFileContent = files.find((f) => f.name === selectedFile);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <nav className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-blue-500" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Markdown Viewer
                </h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    const newMode = !darkMode;
                    setDarkMode(newMode);
                    localStorage.setItem('darkMode', String(newMode));
                  }}
                  className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div
                {...getRootProps()}
                className={`card p-6 border-2 border-dashed transition-all duration-200 cursor-pointer
                  ${isDragActive 
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <Upload className={`h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                    {isDragActive ? 'Drop your markdown files here' : 'Drag & drop markdown files or click to select'}
                  </p>
                </div>
              </div>

              {error && (
                <div className="card p-4 border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20">
                  <div className="flex items-center">
                    <FileWarning className="h-5 w-5 text-red-400" />
                    <p className="ml-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {files.length > 0 && (
                <div className="card p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Your files</h3>
                  <ul className="space-y-2">
                    {files.map((file) => (
                      <li key={file.name} className="group flex items-center">
                        <button
                          onClick={() => setSelectedFile(file.name)}
                          className={`flex-grow p-2 text-sm rounded-lg transition-all duration-200 min-w-0
                            ${selectedFile === file.name
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                            }`}
                          title={file.name}
                        >
                          <div className="flex items-center min-w-0">
                            <FileText className="h-4 w-4 flex-shrink-0 mr-2" />
                            <span className="truncate block">{file.name}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file.name)}
                          className="opacity-0 group-hover:opacity-100 ml-2 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex-shrink-0"
                          title="Delete file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="card flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              ) : selectedFileContent ? (
                <div className="card overflow-hidden">
                  <div className="prose dark:prose-invert max-w-none p-8">
                    <Suspense 
                      fallback={
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
                        </div>
                      }
                    >
                      <Virtuoso
                        style={{ height: 'calc(100vh - 200px)' }}
                        totalCount={selectedFileContent.chunks.length}
                        itemContent={index => (
                          <MarkdownChunk content={selectedFileContent.chunks[index]} />
                        )}
                        components={{
                          List: React.forwardRef((props, ref) => (
                            <div {...props} ref={ref as any} className="space-y-4" />
                          ))
                        }}
                      />
                    </Suspense>
                  </div>
                </div>
              ) : (
                <div className="card flex flex-col items-center justify-center h-64 p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a file to view its content or drag and drop a markdown file to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

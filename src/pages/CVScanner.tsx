import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  value: string;
}

interface Question {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: QuestionOption[] | { A: string; B: string; C: string; D: string };
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

interface Quiz {
  test_title: string;
  questions: Question[];
}

interface Strength {
  area: string;
  explanation: string;
  evidence: string[];
}

interface Improvement {
  area: string;
  explanation: string;
  priority: 'high' | 'medium' | 'low';
  suggested_actions: string[];
}

interface FitRole {
  title: string;
  match_score: number;
  rationale: string;
}

interface Analysis {
  summary: string;
  strengths: Strength[];
  improvements: Improvement[];
  fit_for_roles: FitRole[];
  confidence: 'high' | 'medium' | 'low';
}

type StepType = 'upload' | 'analyzing' | 'quiz' | 'answering' | 'result';

const CVScanner: React.FC = () => {
  const [step, setStep] = useState<StepType>('upload');
  const [cvText, setCvText] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [userAnswerQuiz, setUserAnswerQuiz] = useState<
    Record<number, string> | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webhookBaseUrl = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:1234/webhook';

  // Extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items
          .map((item: any) => item.str)
          .join(' ');
        extractedText += '\n';
      }

      return extractedText;
    } catch (err) {
      throw new Error('Không thể đọc file PDF');
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setError('Vui lòng upload file PDF');
      return;
    }

    try {
      setError('');
      setLoading(true);
      setCvFile(file);

      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      setCvText(text);

      // Call n8n webhook to analyze CV and generate quiz
      await analyzeCVAndGenerateQuiz(text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Lỗi khi upload file'
      );
    } finally {
      setLoading(false);
    }
  };

  // Analyze CV and generate quiz via n8n webhook
  const analyzeCVAndGenerateQuiz = async (cvContent: string) => {
    try {
      setStep('analyzing');
      setError('');

      // Call n8n webhook for quiz generation
      const quizResponse = await fetch(
        `${webhookBaseUrl}/quiz`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cvContent }),
          signal: AbortSignal.timeout(120000), // 120 second timeout (n8n AI Agent needs time)
        }
      );

      if (!quizResponse.ok) {
        const errorText = await quizResponse.text();
        throw new Error(`Lỗi server (${quizResponse.status}): ${errorText || 'Không thể tạo bài quiz'}`);
      }

      let responseData = await quizResponse.json();
      
      // Handle n8n response wrapping (sometimes response is wrapped in array)
      if (Array.isArray(responseData) && responseData.length > 0) {
        responseData = responseData[0];
      }
      
      // Handle n8n output property wrapping
      if (responseData.output && typeof responseData.output === 'object') {
        responseData = responseData.output;
      }
      
      // Log response for debugging
      console.log('Quiz Response:', responseData);
      
      // Validate quiz data structure
      if (!responseData) {
        throw new Error('Dữ liệu quiz trống');
      }

      let questions = responseData.questions;
      
      // Handle case where questions might be wrapped in another property
      if (!questions && responseData.data && responseData.data.questions) {
        questions = responseData.data.questions;
      }
      
      if (!questions || !Array.isArray(questions)) {
        console.error('Invalid questions structure:', responseData);
        throw new Error(`Dữ liệu quiz không hợp lệ. Nhận được: ${JSON.stringify(responseData).substring(0, 200)}`);
      }

      if (questions.length === 0) {
        throw new Error('Không thể tạo bài quiz từ CV này');
      }

      // Validate each question
      const validQuestions = questions.every((q: any) => 
        q.id !== undefined && q.question && q.options && q.correct_answer && q.difficulty
      );

      if (!validQuestions) {
        console.error('Invalid question structure:', questions[0]);
        throw new Error('Dữ liệu quiz không đầy đủ');
      }

      const quizData: Quiz = {
        test_title: responseData.test_title || 'Bài Test Kỹ Thuật',
        questions: questions,
      };

      setQuiz(quizData);
      setStep('quiz');
    } catch (err) {
      let errorMessage = 'Lỗi khi xử lý CV';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.message.includes('timed out')) {
          errorMessage = 'Yêu cầu mất quá lâu (>120s). Vui lòng kiểm tra n8n server hoặc thử lại với CV ngắn hơn.';
        } else {
          errorMessage = err.message;
        }
      }
      
      console.error('CV Analysis Error:', err);
      setError(errorMessage);
      setStep('upload');
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit quiz answers
  const handleSubmitQuiz = async () => {
    try {
      setLoading(true);
      setError('');
      setStep('answering');

      // Validate quiz exists
      if (!quiz) {
        throw new Error('Bài quiz không tồn tại');
      }

      // Format answers for n8n webhook
      const answerQuiz = quiz.questions.map((q) => ({
        id: q.id,
        question: q.question,
        user_answer: answers[q.id] || '',
        correct_answer: q.correct_answer,
        explanation: q.explanation,
      }));

      // Store user answers for later
      const userAnswersMap = answerQuiz.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.user_answer,
        }),
        {} as Record<number, string>
      );
      setUserAnswerQuiz(userAnswersMap);

      // Call n8n webhook to analyze answers
      const analysisResponse = await fetch(
        `${webhookBaseUrl}/answer-quiz`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cv: cvText,
            answerquiz: JSON.stringify(answerQuiz),
          }),
          signal: AbortSignal.timeout(120000), // 120 second timeout (n8n AI Agent needs time)
        }
      );

      if (!analysisResponse.ok) {
        const errorText = await analysisResponse.text();
        throw new Error(`Lỗi server (${analysisResponse.status}): ${errorText || 'Không thể phân tích câu trả lời'}`);
      }

      let responseData = await analysisResponse.json();
      
      // Handle n8n response wrapping (sometimes response is wrapped in array)
      if (Array.isArray(responseData) && responseData.length > 0) {
        responseData = responseData[0];
      }
      
      // Handle n8n output property wrapping
      if (responseData.output && typeof responseData.output === 'object') {
        responseData = responseData.output;
      }
      
      // Log response for debugging
      console.log('Analysis Response:', responseData);

      // Validate analysis data structure
      if (!responseData) {
        throw new Error('Dữ liệu phân tích trống');
      }
      
      if (!responseData.summary) {
        console.error('Missing summary in response:', responseData);
        throw new Error(`Dữ liệu phân tích không hợp lệ. Nhận được: ${JSON.stringify(responseData).substring(0, 200)}`);
      }

      // Provide default values for missing fields
      const analysisData: Analysis = {
        summary: responseData.summary || 'Không có tóm tắt',
        strengths: Array.isArray(responseData.strengths) ? responseData.strengths : [],
        improvements: Array.isArray(responseData.improvements) ? responseData.improvements : [],
        fit_for_roles: Array.isArray(responseData.fit_for_roles) ? responseData.fit_for_roles : [],
        confidence: responseData.confidence || 'medium',
      };

      setAnalysis(analysisData);
      setStep('result');
    } catch (err) {
      let errorMessage = 'Lỗi khi gửi câu trả lời';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.message.includes('timed out')) {
          errorMessage = 'Yêu cầu mất quá lâu (>120s). Vui lòng kiểm tra n8n server hoặc thử lại.';
        } else {
          errorMessage = err.message;
        }
      }
      
      console.error('Submit Quiz Error:', err);
      setError(errorMessage);
      setStep('quiz');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setCvText('');
    setCvFile(null);
    setQuiz(null);
    setAnalysis(null);
    setAnswers({});
    setUserAnswerQuiz(null);
    setError('');
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CV Scanner</h1>
          <p className="text-slate-400">
            Phân tích CV và kiểm tra kỹ năng qua bài test
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            <p className="font-semibold">Lỗi:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Step 1: Upload CV */}
        {step === 'upload' && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Bước 1: Tải lên CV
            </h2>

            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-slate-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20m-6-8l-4-4m0 0l-4 4m4-4v12"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-slate-300 font-semibold">
                Kéo thả file CV (PDF) hoặc click để chọn
              </p>
              {cvFile && (
                <p className="text-green-400 mt-3">
                  ✓ Đã chọn: {cvFile.name}
                </p>
              )}
            </div>

            <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
              <p className="text-slate-300">
                📋 Định dạng hỗ trợ: PDF
              </p>
            </div>
          </div>
        )}

        {/* Step 2-3: Quiz */}
        {(step === 'analyzing' || step === 'quiz') && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            {step === 'analyzing' && (
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-slate-300 font-semibold">
                  Đang phân tích CV và tạo bài test...
                </p>
              </div>
            )}

            {step === 'quiz' && quiz && (
              <>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bước 2: Bài Test Kỹ Thuật
                </h2>
                <p className="text-slate-400 mb-6">{quiz.test_title}</p>

                <div className="space-y-6">
                  {quiz.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-white font-semibold">
                          {idx + 1}. {q.question}
                        </p>
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            q.difficulty === 'easy'
                              ? 'bg-green-900/50 text-green-300'
                              : q.difficulty === 'medium'
                              ? 'bg-yellow-900/50 text-yellow-300'
                              : 'bg-red-900/50 text-red-300'
                          }`}
                        >
                          {q.difficulty === 'easy'
                            ? 'Dễ'
                            : q.difficulty === 'medium'
                            ? 'Trung bình'
                            : 'Khó'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {(() => {
                          // Handle both array and object formats
                          const optionEntries = Array.isArray(q.options)
                            ? q.options.map((opt) => [opt.key, opt.value])
                            : Object.entries(q.options);
                          
                          return optionEntries.map(([key, value]) => (
                            <label
                              key={key}
                              className="flex items-center p-3 bg-slate-600/30 rounded cursor-pointer hover:bg-slate-600/50 transition-colors"
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={key}
                                checked={answers[q.id] === key}
                                onChange={(e) =>
                                  handleAnswerSelect(q.id, e.target.value)
                                }
                                className="mr-3"
                              />
                              <span className="text-slate-200">
                                <strong>{key}.</strong> {value}
                              </span>
                            </label>
                          ));
                        })()}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmitQuiz}
                  disabled={
                    loading ||
                    Object.keys(answers).length !== quiz.questions.length
                  }
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {loading
                    ? 'Đang gửi...'
                    : `Gửi Bài Test (${
                        Object.keys(answers).length
                      }/${quiz.questions.length})`}
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 4: Loading analysis */}
        {step === 'answering' && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <p className="mt-4 text-slate-300 font-semibold">
              Đang phân tích kết quả và tạo báo cáo...
            </p>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 'result' && analysis && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                Bước 3: Kết Quả Phân Tích
              </h2>
              <p className="text-slate-300 text-lg">{analysis.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-slate-400">Độ tin cậy phân tích:</span>
                <span
                  className={`px-3 py-1 rounded font-semibold ${
                    analysis.confidence === 'high'
                      ? 'bg-green-900/50 text-green-300'
                      : analysis.confidence === 'medium'
                      ? 'bg-yellow-900/50 text-yellow-300'
                      : 'bg-red-900/50 text-red-300'
                  }`}
                >
                  {analysis.confidence === 'high'
                    ? 'Cao'
                    : analysis.confidence === 'medium'
                    ? 'Trung bình'
                    : 'Thấp'}
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-green-400 mr-2">✓</span> Điểm Mạnh
              </h3>
              <div className="space-y-4">
                {analysis.strengths.map((s, idx) => (
                  <div key={idx} className="p-4 bg-green-900/20 rounded-lg border border-green-700/50">
                    <p className="font-semibold text-green-300">{s.area}</p>
                    <p className="text-slate-300 text-sm mt-1">{s.explanation}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.evidence.map((e, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-900/50 rounded text-xs text-green-200"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-yellow-400 mr-2">⚡</span> Cần Cải Thiện
              </h3>
              <div className="space-y-4">
                {analysis.improvements.map((imp, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      imp.priority === 'high'
                        ? 'bg-red-900/20 border-red-700/50'
                        : imp.priority === 'medium'
                        ? 'bg-yellow-900/20 border-yellow-700/50'
                        : 'bg-blue-900/20 border-blue-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{imp.area}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          imp.priority === 'high'
                            ? 'bg-red-900/50 text-red-300'
                            : imp.priority === 'medium'
                            ? 'bg-yellow-900/50 text-yellow-300'
                            : 'bg-blue-900/50 text-blue-300'
                        }`}
                      >
                        {imp.priority === 'high'
                          ? 'Cao'
                          : imp.priority === 'medium'
                          ? 'Trung bình'
                          : 'Thấp'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">{imp.explanation}</p>
                    <div className="mt-3">
                      <p className="text-xs text-slate-400 font-semibold mb-1">Hành động đề xuất:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {imp.suggested_actions.map((action, i) => (
                          <li key={i} className="text-slate-300 text-sm">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fit for roles */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-blue-400 mr-2">💼</span> Vị Trí Phù Hợp
              </h3>
              <div className="space-y-3">
                {analysis.fit_for_roles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-blue-300">{role.title}</p>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-slate-700 rounded-full mr-2 overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${(role.match_score * 100).toFixed(0)}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-blue-300 font-semibold">
                          {(role.match_score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">{role.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Results */}
            {quiz && userAnswerQuiz && (
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">📝 Kết Quả Bài Test</h3>
                <div className="space-y-3">
                  {quiz.questions.map((q, idx) => {
                    const userAnswer = userAnswerQuiz[q.id];
                    const isCorrect = userAnswer === q.correct_answer;
                    return (
                      <div
                        key={q.id}
                        className={`p-3 rounded-lg border ${
                          isCorrect
                            ? 'bg-green-900/20 border-green-700/50'
                            : 'bg-red-900/20 border-red-700/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-slate-200 text-sm">
                            {idx + 1}. {q.question}
                          </p>
                          <span className="text-xs font-semibold ml-2">
                            {isCorrect ? (
                              <span className="text-green-300">✓ Đúng</span>
                            ) : (
                              <span className="text-red-300">✗ Sai</span>
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Bạn chọn: <strong>{userAnswer}</strong> |{' '}
                          Đáp án: <strong>{q.correct_answer}</strong>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Bắt Đầu Lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVScanner;

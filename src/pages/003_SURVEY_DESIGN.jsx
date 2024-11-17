// src/pages/003_SURVEY_DESIGN.jsx
import { useState } from "react";

export default function SurveyDesign() {
  const [purpose, setPurpose] = useState("");
  const [target, setTarget] = useState("");
  const [sampleSize, setSampleSize] = useState("");
  const [surveyMethod, setSurveyMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/completion-messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SURVEY_DESIGN_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              purpose,
              target,
              sample_size: sampleSize,
              survey_method: surveyMethod,
              notes,
            },
            response_mode: "blocking",
            user: "web-client",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.answer);
    } catch (error) {
      console.error("Error:", error);
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-10">アンケート設計支援アプリ</h1>
        <p className="mb-4">AIがアンケートの設計案を作成します。</p>

        {error && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 入力フォーム */}
        <div className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">調査目的</span>
              <span className="label-text-alt text-error">必須</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 font-mono text-sm"
              placeholder="何を明らかにしたいのか、簡潔に記入してください"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">対象者の属性</span>
              <span className="label-text-alt text-error">必須</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 font-mono text-sm"
              placeholder="年齢層、職業、利用経験など、回答者の属性を記入してください"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">想定回答数</span>
              <span className="label-text-alt text-error">必須</span>
            </label>
            <input
              type="number"
              className="input input-bordered font-mono text-sm"
              placeholder="例：100"
              value={sampleSize}
              onChange={(e) => setSampleSize(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">調査方法</span>
              <span className="label-text-alt">任意</span>
            </label>
            <input
              type="text"
              className="input input-bordered font-mono text-sm"
              placeholder="例：オンライン、対面、紙など"
              value={surveyMethod}
              onChange={(e) => setSurveyMethod(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">特記事項</span>
              <span className="label-text-alt">任意</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 font-mono text-sm"
              placeholder="特に知りたい項目や避けたい質問などがあれば記入してください"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="btn btn-primary flex-1"
              disabled={!purpose || !target || !sampleSize || isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              )}
              アンケートを設計
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setPurpose("");
                setTarget("");
                setSampleSize("");
                setSurveyMethod("");
                setNotes("");
                setResult("");
              }}
              disabled={isLoading}
            >
              クリア
            </button>
          </div>
        </div>

        {/* 結果表示エリア */}
        <div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                生成されたアンケート案
              </span>
              {result && (
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => navigator.clipboard.writeText(result)}
                >
                  📋 コピー
                </button>
              )}
            </label>
            <textarea
              className="textarea textarea-bordered h-[600px]"
              value={result}
              readOnly
              placeholder="生成されたアンケート案がここに表示されます"
            ></textarea>
          </div>
        </div>
      </div>

      {/* 補足情報 */}
      <div className="mt-8">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            使い方のヒント
          </div>
          <div className="collapse-content">
            <p>1. 調査目的を具体的に入力します</p>
            <p>2. 対象者の属性を明確に指定します</p>
            <p>3. 想定する回答数を入力します</p>
            <p>4. 必要に応じて調査方法や特記事項を追加します</p>
            <p className="mt-4 text-sm text-warning">
              生成されたアンケート案は、必ず内容を確認し、必要に応じて調整してください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//　Difyのプロンプト
// あなたはアンケート設計の専門家として、ユーザーの目的に合わせた最適なアンケートを設計します。

// 提供された情報：
// - 調査目的: {{purpose}}
// - 対象者の属性: {{target}}
// - 想定回答数: {{sample_size}}
// - [任意] 調査方法: {{survey_method}}
// - [任意] 特記事項: {{notes}}

// 以下の点を考慮してアンケートを設計してください：

// 1. 調査目的を達成するために必要な質問を、最小限の数で構成します
// 2. 対象者の属性に合わせた適切な言葉遣いと質問形式を選択します
// 3. 想定回答数に基づいて、統計的に有意な結果が得られる設計にします
// 4. 回答者の負担を考慮した設計にします
// 5. 質問は以下の要素を含めて設計します：
//    - 質問文
//    - 回答形式（選択式/自由記述など）
//    - 選択肢（選択式の場合）

// 出力形式：

// # アンケート設計案

// ## 基本情報
// - 想定回答時間：○分
// - 質問数：○問
// - 推奨実施方法：

// ## 質問項目
// 1. [質問1]
//    回答形式：
//    選択肢：

// 2. [質問2]
//    回答形式：
//    選択肢：

// [以下続く]

// ## 補足事項
// - このアンケートの概要
// - 統計学的な解説
// - 集計後の分析手法の詳細
// - 集計時の注意点
// - 実施時の留意事項

// 出力はマークダウン形式にする必要はありません

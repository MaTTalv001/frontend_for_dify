// src/pages/Function1.jsx
// Difyで議事録作成支援アプリのエンドポイントを作成しておく
// エンドポイントは.envでREACT_APP_MINUTES_SUMMARY_APIとして定義する

import { useState } from "react";

export default function Function1() {
  const [transcriptText, setTranscriptText] = useState("");
  const [summaryResult, setSummaryResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSummaryResult("");
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/completion-messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MINUTES_SUMMARY_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              query: transcriptText,
            },
            response_mode: "streaming",
            user: "web-client", // 必要に応じて適切なuser識別子を設定
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      // ストリーミングレスポンスの処理
      // ストリーミングレスポンスの処理部分を修正
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // デコードしてレスポンスを処理
        const text = decoder.decode(value);
        const lines = (partialResponse + text).split("\n");
        partialResponse = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "") continue;

          // "data: " プレフィックスを除去
          const jsonStr = line.replace(/^data: /, "").trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            if (data.event === "message" && data.answer) {
              setSummaryResult((prev) => prev + data.answer);
            }
            // message_end イベントの処理も追加可能
            if (data.event === "message_end") {
              console.log("Stream completed");
            }
          } catch (e) {
            console.warn("Failed to parse streaming response line:", jsonStr);
          }
        }
      }
    } catch (err) {
      setError("APIリクエスト中にエラーが発生しました。" + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-10">議事録生成アプリ</h1>
        <p className="mb-4">
          Teams会議の文字起こし(トランスクリプト)から議事録案を自動生成します。
        </p>

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
              <span className="label-text font-bold">Teams文字起こし</span>
              <span className="label-text-alt text-error">必須</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-[400px] font-mono text-sm"
              placeholder="Teamsの文字起こしをコピー&ペーストしてください。話者情報などもそのまま貼り付けて構いませんが、議題の範囲は一つに限定してください"
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="btn btn-primary flex-1"
              disabled={!transcriptText || isLoading}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              要約開始
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setTranscriptText("");
                setSummaryResult("");
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
              <span className="label-text font-bold">生成された議事録</span>
              {summaryResult && (
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => navigator.clipboard.writeText(summaryResult)}
                >
                  📋 コピー
                </button>
              )}
            </label>
            <textarea
              className="textarea textarea-bordered h-[400px]"
              value={summaryResult}
              readOnly
              placeholder="議事録案がここに表示されます"
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
            <p>1. Teams会議の文字起こしをコピーします</p>
            <p className="mt-4 text-sm text-warning">
              一つの議題の範囲に限定してください。複数あると要約できません
            </p>
            <p>2. 左側のテキストエリアにペーストします</p>
            <p className="mt-4 text-sm text-warning">
              {" "}
              話者名を含めそのまま貼り付けて構いません。
            </p>
            <p>3. 「要約開始」ボタンをクリックします</p>
            <p>4. 生成された議事録を確認します</p>
            <p className="mt-4 text-sm text-warning">
              {" "}
              生成された議事録は、必ず内容を確認してください
            </p>
            <p className="mt-4 text-sm text-warning">
              {" "}
              会議で集音マイクを使用した場合は話者情報は正確ではありません
            </p>
            <p className="mt-4 text-sm text-warning">
              {" "}
              文字数が多いと出力されないことがあります。その場合は不要な箇所を削除して入力ください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//　Difyのプロンプト
// ユーザーがTeamsの文字起こしを入力します。文字起こしなのであーとかうーみたいな不要なものも多いです。
// 全体の要約を出力してください。マークダウンは使わないでください

// 必要な事項
// - 議案名
// - 決定されたこと
// - To Do(あれば)
// - 会話歴の要約

// {{query}}

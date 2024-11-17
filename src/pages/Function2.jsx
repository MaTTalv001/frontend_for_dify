// src/pages/EmailReply.jsx
import { useState } from "react";

export default function EmailReply() {
  const [mail, setMail] = useState("");
  const [condition, setCondition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/completion-messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_EMAIL_REPLY_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              mail: mail,
              condition: condition,
            },
            response_mode: "blocking",
            user: "user-1", // 適切なユーザーIDを設定してください
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
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-10">メール返信支援アプリ</h1>
        <p className="mb-4">AIがメールの返信文を作成します。</p>

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
              <span className="label-text font-bold">メール本文</span>
              <span className="label-text-alt text-error">必須</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-[300px] font-mono text-sm"
              placeholder="返信したいメールの本文を入力してください"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">返信時の条件</span>
              <span className="label-text-alt">任意</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 font-mono text-sm"
              placeholder="例：回答したいことの概要、こちら側の状況、さらに聞きたいこと、簡潔に返信、など"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="btn btn-primary flex-1"
              disabled={!mail || isLoading}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
              返信文を作成
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                setMail("");
                setCondition("");
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
              <span className="label-text font-bold">生成された返信文</span>
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
              className="textarea textarea-bordered h-[400px]"
              value={result}
              readOnly
              placeholder="生成された返信文がここに表示されます"
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
            <p>1. 返信したいメールの本文を入力します</p>
            <p>2. 必要に応じて返信時の条件を入力します</p>
            <p className="mt-4 text-sm text-warning">
              条件は簡潔に記載してください
            </p>
            <p>3. 「返信文を作成」ボタンをクリックします</p>
            <p>4. 生成された返信文を確認します</p>
            <p className="mt-4 text-sm text-warning">
              生成された返信文は、必ず内容を確認してください
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

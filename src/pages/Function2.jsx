// src/pages/Function1.jsx
import { useState } from 'react';

export default function Function1() {
  const [inputText, setInputText] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここに送信処理を実装
    console.log('送信されたデータ:', { inputText, description });
    alert('送信されました！');
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">テキスト解析ツール</h1>
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>入力したテキストを解析し、結果を表示します。</span>
        </div>
      </div>

      {/* メインフォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">タイトル</span>
            <span className="label-text-alt text-error">必須</span>
          </label>
          <input 
            type="text" 
            placeholder="タイトルを入力" 
            className="input input-bordered w-full" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">詳細説明</span>
          </label>
          <textarea 
            className="textarea textarea-bordered h-24" 
            placeholder="詳細な説明を入力してください"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* オプション選択 */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">追加オプション</span> 
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
        </div>

        {/* 送信ボタン */}
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="btn btn-primary flex-1"
            disabled={!inputText} // タイトルが空の場合は無効化
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            解析開始
          </button>
          <button 
            type="reset" 
            className="btn btn-outline"
            onClick={() => {
              setInputText('');
              setDescription('');
            }}
          >
            リセット
          </button>
        </div>
      </form>

      {/* 補足情報 */}
      <div className="mt-8">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" /> 
          <div className="collapse-title text-xl font-medium">
            使い方のヒント
          </div>
          <div className="collapse-content"> 
            <p>1. タイトルを入力します（必須）</p>
            <p>2. 必要に応じて詳細説明を追加します</p>
            <p>3. オプションを選択します</p>
            <p>4. 解析開始ボタンをクリックします</p>
          </div>
        </div>
      </div>
    </div>
  );
}
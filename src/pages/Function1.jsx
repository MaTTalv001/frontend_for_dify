// src/pages/Function1.jsx
import { useState } from 'react';

export default function Function1() {
    const [transcriptText, setTranscriptText] = useState('');
    const [summaryResult, setSummaryResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
    // モック処理
    setTimeout(() => {
        setSummaryResult('ここに議事録要約が表示されます。\n\n【会議概要】\n...\n\n【主な議題】\n...\n\n【決定事項】\n...');
        setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/* ヘッダーセクション */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">議事録要約ツール</h1>
                <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Teams会議の文字起こしから議事録を自動生成します。</span>
                </div>
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
                            placeholder="Teamsの文字起こしをコピー&ペーストしてください。話者情報などもそのまま貼り付けて構いませんが、議題は一つにしてください"
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            )}
                            要約開始
                        </button>
                        <button 
                            className="btn btn-outline"
                            onClick={() => {
                                setTranscriptText('');
                                setSummaryResult('');
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
                    placeholder="要約結果がここに表示されます"
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
                <p className="mt-4 text-sm text-warning">一つの議題の範囲に限定してください。複数の議題が混ざると要約できません</p>
                <p>2. 左側のテキストエリアにペーストします</p>
                <p className="mt-4 text-sm text-warning"> 話者名を含めそのまま貼り付けて構いません。</p>
                <p>3. 「要約開始」ボタンをクリックします</p>
                <p>4. 生成された議事録を確認します</p>
                <p className="mt-4 text-sm text-warning"> 生成された議事録は、必ず内容を確認してください</p>
                <p className="mt-4 text-sm text-warning"> 会議で集音マイクを使用した場合は話者情報は正確ではありません</p>
                <p className="mt-4 text-sm text-warning"> 文字数が多いと出力されないことがあります。その場合は不要な箇所を削除して入力ください</p>
            </div>
            </div>
        </div>
    </div>
    );
}
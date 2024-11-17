// src/pages/Top.jsx
import { Link } from 'react-router-dom';
import { menuItems } from '../configs/menuItems';
import { useState } from 'react';

export default function Top() {
    const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ定義
    const functionItems = menuItems.filter(item => item.path !== "/"); // ホームを除外

    // 検索クエリ入力後の表示
    const filteredItems = functionItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            {/* ヒーローセクション */}
            <div className="hero min-h-[40vh] bg-base-200 rounded-lg mb-8">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold mb-6">SHAPPs</h1>
                        <p className="mb-4 mt-4">業務改善に使用できるちょっとしたAIアプリ集です。目的に応じたアプリを選択して使用してください。</p>
                        <div className="card bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title justify-center">Concept</h2>
                                <p className="text-2xl font-bold">「ある程度まではAIに任せよう」</p>
                                <p className="text-sm opacity-75">※出力内容の確認は自身で行なってください</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 検索バー */}
            <div className="form-control w-full max-w-md mx-auto mb-8">
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="アプリを検索..." 
                        className="input input-bordered w-full" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                        className="btn btn-square"
                        onClick={() => setSearchQuery('')}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    )}
                </div>
            </div>

        {/* カードセクション */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                        {item.icon}
                        {item.title}
                        </h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                        <Link to={item.path} className="btn btn-primary">
                            機能を開く
                        </Link>
                        </div>
                    </div>
                </div>
            ))
            ) : (
                <div className="col-span-full text-center py-8">
                    <p className="text-lg text-gray-500">
                    検索結果が見つかりませんでした
                    </p>
                </div>
                )}
            </div>
        </div>
        );
}
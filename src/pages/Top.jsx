// src/pages/Top.jsx
import { Link } from 'react-router-dom';
import { menuItems } from '../configs/menuItems';

export default function Top() {
  const functionItems = menuItems.filter(item => item.path !== "/"); // ホームを除外

  return (
    <div className="container mx-auto p-4">
      {/* ヒーローセクション */}
      <div className="hero min-h-[50vh] bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">ようこそ</h1>
            <p className="py-6">利用可能な機能の一覧です。各機能の詳細は下記カードをご確認ください。</p>
          </div>
        </div>
      </div>

      {/* カードセクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {functionItems.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
}
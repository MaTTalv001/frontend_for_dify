import { Link } from 'react-router-dom';

export default function Top() {
  return (
    <div className="container mx-auto p-4">
      {/* ヒーローセクション */}
      <div className="hero min-h-[50vh] bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">ようこそ</h1>
            <p className="py-6">アプリケーションのトップページです</p>
            <Link to="/function1" className="btn btn-primary">機能1へ移動</Link>
          </div>
        </div>
      </div>

      {/* カードセクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">カード1</h2>
            <p>カードの説明文がここに入ります。</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">詳細</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">カード2</h2>
            <p>カードの説明文がここに入ります。</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">詳細</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">カード3</h2>
            <p>カードの説明文がここに入ります。</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">詳細</button>
            </div>
          </div>
        </div>
      </div>

      {/* スタッツセクション */}
      <div className="stats shadow w-full mt-8">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">総アクセス数</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% より増加</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">新規ユーザー</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↗︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
}
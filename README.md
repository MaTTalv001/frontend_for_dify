# Dify 用フロントアプリ集

- AI アプリを別途 Dify で開発しておき、そのエンドポイントを叩くためのフロントアプリケーションです

# アプリケーション開発ガイド

## 環境構築

1. リポジトリをクローンします

```bash
git clone https://.....
```

2. `.env.template`をコピーして`.env`ファイルを作成します

3. コンテナをビルドします

```bash
docker compose up --build
```

4. デフォルトでは 3000 ポートでブラウザからアクセスできます

## 初期設定

### 1. 環境変数の設定

0. Dify でアプリケーションを作成し、API キーを取得します
1. 新規アプリの場合は API キーの定数名を.env.template に定義しておきます

- 例：`REACT_APP_MAIL_TRANSLATE_API= `

2. `.env`ファイルに必要な環境変数を設定します：

   ```env
   # API Endpoints(共通部分)
   REACT_APP_API_BASE_URL=http://localhost/v1

   # API Keys(アプリごとに払い出し)の例
   REACT_APP_MINUTES_SUMMARY_API=your-api-key-here
   REACT_APP_EMAIL_REPLY_API=your-api-key-here
   ```

3. コンテナに環境変数を有効化させます

```bash
docker compose restart
```

## 新機能の開発手順

### 1. 機能定義の追加

`src/configs/menuItems.js` に新機能の定義を追加します：

```javascript
export const menuItems = [
  {
    title: "新機能名",
    path: "/new-function",
    description:
      "この機能の説明文をここに記載します。この説明はサイドバーのツールチップとトップページの機能一覧で使用されます。",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        // アイコンのパスを設定
      </svg>
    ),
  },
];
```

必須項目：

- `title`: 機能の表示名
- `path`: ルーティングパス（例: "/function-name"）
- `description`: 機能の説明文
- `icon`: 機能を表すアイコン要素
  - アイコンは`https://heroicons.com/`でパスを取得します。MIT ライセンスです。

### 2. ページコンポーネントの作成

`src/pages` ディレクトリに新機能のコンポーネントファイルを作成します。

- ファイル名は`001_MINUTES_SUMMARY.jsx`などとし、アプリの内容や、環境変数の名称やルーティングと整合性を担保してください

- 基本的な API リクエスト処理の例：

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

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
            query: inputText, // 入力テキスト
          },
          response_mode: "streaming",
          user: "web-client",
        }),
      }
    );

    // ストリーミングレスポンスの処理
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      // レスポンスの処理...
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};
```

### 3. ルーティングの追加

`src/App.jsx` に新機能のルートを追加します：

```jsx
import Top from "./pages/Top";
import MINUTES_SUMMARY from "./pages/001_MINUTES_SUMMARY";
import NEW_FUNCTION from "./pages/xxx_NEW_FUNCTION"; // 追加するページをインポートする。この定義も整合性は意識する

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/001_MINUTES_SUMMARY" element={<MINUTES_SUMMARY />} />
          {/* 同様にさまざまなアプリのルーティング */}
          <Route path="/new-function" element={<NewFunction />} /> //追加する
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## デザインガイドライン

- ページコンポーネントでは Daisy UI のコンポーネントを活用してください
- レスポンシブデザインを考慮し、適切なグリッドシステムを使用してください
- アイコンは [Heroicons](https://heroicons.com/) から選択して使用してください

## 注意事項

- 環境変数は必ず`REACT_APP_`プレフィックスを付けてください
- API キーは`.env`ファイルで管理し、`.gitignore`に含めてください
- 各機能の API リクエストは Dify の仕様に従って実装してください
- トップページの機能一覧は`menuItems.js`から自動生成されます
- サイドバーのツールチップも`menuItems.js`の説明文を使用します

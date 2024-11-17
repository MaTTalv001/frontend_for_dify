# アプリケーション開発ガイド

## 初期設定

### 1. 環境変数の設定

1. `.env.template`をコピーして`.env`ファイルを作成します
2. `.env`ファイルに必要な環境変数を設定します：
   ```env
   # API Endpoints
   REACT_APP_API_BASE_URL=http://localhost/v1
   
   # API Keys
   REACT_APP_MINUTES_SUMMARY_API=your-api-key-here
   ```
   
### 2. Dify APIの設定

1. Difyでアプリケーションを作成し、APIキーを取得します
2. 取得したAPIキーを`.env`ファイルの対応する変数に設定します
   - 例：`REACT_APP_MINUTES_SUMMARY_API=dify_api_key...`
3. 新しいアプリのAPIキーの定義は.env.templateに書きます
   - 例：`REACT_APP_MAIL_TRANSLATE_API= ` 

## 新機能の開発手順

### 1. 機能定義の追加

`src/configs/menuItems.js` に新機能の定義を追加します：

```javascript
export const menuItems = [
  {
    title: "新機能名",
    path: "/new-function",
    description: "この機能の説明文をここに記載します。この説明はサイドバーのツールチップとトップページの機能一覧で使用されます。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        // アイコンのパスを設定
      </svg>
    )
  }
];
```

必須項目：
- `title`: 機能の表示名
- `path`: ルーティングパス（例: "/function-name"）
- `description`: 機能の説明文
- `icon`: 機能を表すアイコン要素

### 2. ページコンポーネントの作成

`src/pages` ディレクトリに新機能のコンポーネントファイルを作成します。

基本的なAPIリクエスト処理の例：
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/completion-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_MINUTES_SUMMARY_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          query: inputText,  // 入力テキスト
        },
        response_mode: 'streaming',
        user: 'web-client'
      })
    });

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
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

### 3. ルーティングの追加

`src/App.jsx` に新機能のルートを追加します：

```jsx
import NewFunction from './pages/NewFunction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/new-function" element={<NewFunction />} />
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
- APIキーは`.env`ファイルで管理し、`.gitignore`に含めてください
- 各機能のAPIリクエストはDifyの仕様に従って実装してください
- トップページの機能一覧は`menuItems.js`から自動生成されます
- サイドバーのツールチップも`menuItems.js`の説明文を使用します




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

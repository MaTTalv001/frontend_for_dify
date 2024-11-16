import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <img src={logo} className="App-logo mx-auto" alt="logo" />
            <h1 className="text-5xl font-bold">AIミニアプリ</h1>
            <p className="py-6">
              業務効率のためのアプリ集です
            </p>
            <button className="btn btn-primary">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 }
 
 export default App;
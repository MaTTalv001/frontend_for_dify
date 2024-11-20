import { useState } from "react";

export default function ICHSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_ICH_API}/rag`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="max-w-6xl mx-auto mt-10 px-4">
     <div className="text-center mb-8">
       <h1 className="text-3xl font-bold mb-10">ICHガイドライン検索</h1>
        <p className="mb-4">ICHガイドラインの検索とAIによる回答を出力します</p>
       {error && (
         <div className="alert alert-error mb-4">
           <span>{error}</span>
         </div>
       )}
     </div>

     <div className="grid md:grid-cols-2 gap-6 mb-8">
       <div className="space-y-6">
         <div className="form-control">
           <label className="label">
             <span className="label-text font-bold">質問内容</span>
             <span className="label-text-alt text-error">必須</span>
           </label>
           <textarea
             className="textarea textarea-bordered h-24 font-mono text-sm"
             placeholder="ICHガイドラインについて質問してください"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             required
           />
         </div>

         <button
           onClick={handleSubmit}
           className="btn btn-primary w-full"
           disabled={!query || isLoading}
         >
           {isLoading ? (
             <span className="loading loading-spinner"></span>
           ) : (
             "検索"
           )}
         </button>
       </div>

       <div className="form-control">
         <label className="label">
           <span className="label-text font-bold">回答</span>
         </label>
         <textarea
           className="textarea textarea-bordered h-[200px]"
           value={result?.answer || ""}
           readOnly
           placeholder="回答がここに表示されます"
         />
       </div>
     </div>

     {result?.sources && (
 <div className="space-y-4 mt-8">
   {result.sources.map((source, i) => (
     <div key={i} className="card bg-base-200">
       <div className="card-body">
         <div className="flex justify-between items-start">
           <div>
             <h3 className="card-title text-lg">{source.title}</h3>
             <div className="grid grid-cols-2 gap-4 mt-2">
               <p><span className="font-bold">コード:</span> {source.code}</p>
               <p><span className="font-bold">カテゴリ:</span> {source.category}</p>
             </div>
             <p className="text-sm mt-4">{source.preview}</p>
           </div>
           {source.source_file && (
             <a 
               href={`https://www.pmda.go.jp/files/${source.source_file}`}
               target="_blank"
               rel="noopener noreferrer"
               className="btn btn-primary btn-sm"
             >
               該当PDFにアクセス
             </a>
           )}
         </div>
       </div>
     </div>
   ))}
 </div>
)}
   </div>
 );
}
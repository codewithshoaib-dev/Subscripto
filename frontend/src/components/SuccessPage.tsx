import { useNavigate } from "react-router-dom";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}


export function SuccessPage() {

  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600 mb-6">
          <CheckIcon />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Payment Successful</h1>
        <p className="text-sm text-gray-600 mb-6">This was a demo payment flow. No real transaction occurred.</p>
        <button onClick={() => navigate("/")} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
          Back to Home
        </button>
      </div>
    </div>
  );
}



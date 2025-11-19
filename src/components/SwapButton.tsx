import { useCallback, useEffect, useRef, useState } from "react";
import { CircleCheck, Loader } from "lucide-react";

export const Toast = ({ message }: { message: string }) => (
  <div
    role="status"
    aria-live="polite"
    className="fixed top-5 right-5 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md animate-fade-in"
  >
    <CircleCheck className="inline-block mr-2 h-5 w-5 text-green-500" />
    {message}
  </div>
);

export const SwapButton = () => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const swapTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);

  const handleSwap = useCallback(() => {
    if (loading) return;

    setLoading(true);

    // simulate API call
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setLoading(false);
      setShowToast(true);

      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  }, [loading]);

  useEffect(() => {
    return () => {
      if (swapTimer.current) window.clearTimeout(swapTimer.current);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const btnClass = `w-full p-2 rounded-lg tracking-wider text-md font-bold cursor-pointer ${
    loading
      ? "bg-amber-200 cursor-not-allowed"
      : "bg-amber-400 hover:bg-amber-300"
  }`;

  return (
    <div className="relative">
      <button onClick={handleSwap} disabled={loading} className={btnClass}>
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <Loader className="animate-spin h-5 w-5 text-gray-900" />
            Swapping...
          </div>
        ) : (
          "Swap"
        )}
      </button>

      {showToast && <Toast message="Swap completed successfully!" />}
    </div>
  );
};

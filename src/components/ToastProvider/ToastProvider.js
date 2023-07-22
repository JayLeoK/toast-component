import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function appendToast(toast) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant: toast.variant,
        message: toast.message,
      },
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  //memoize to prevent custom hook from re-rendering
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);
  useKeydown("Escape", handleEscape);

  return (
    <ToastContext.Provider value={{ toasts, appendToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

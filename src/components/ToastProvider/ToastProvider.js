import React from "react";

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

  function clearToasts() {
    setToasts([]);
  }

  return (
    <ToastContext.Provider
      value={{ toasts, appendToast, dismissToast, clearToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

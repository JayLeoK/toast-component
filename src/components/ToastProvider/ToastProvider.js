import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function onEscape(event) {
      if (event.key === "Escape") {
        setToasts([]);
      }
    }
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [toasts]);

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

  return (
    <ToastContext.Provider value={{ toasts, appendToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

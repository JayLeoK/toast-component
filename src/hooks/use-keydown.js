import React from "react";

function useKeydown(keyCode, callback) {
  React.useEffect(() => {
    function onKeyDown(event) {
      if (event.key === keyCode) {
        callback(event);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [callback]);
}

export default useKeydown;

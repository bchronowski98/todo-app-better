import React, { useEffect } from "react";

const useOutsideClick = (ref, handler, setHandler) => {
  useEffect(() => {
    const clickOutside = (e) => {
      if (!ref.current.contains(e.target)) {
        setHandler((prevState) => !prevState);
      }
    };
    if (handler) {
      document.addEventListener("mousedown", clickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [handler]);
};

export default useOutsideClick;

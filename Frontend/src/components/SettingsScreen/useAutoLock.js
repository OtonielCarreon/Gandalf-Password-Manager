import { useEffect } from "react";

export default function useAutoLock(autoLockMinutes) {
  useEffect(() => {
    if (!autoLockMinutes) return;

    const timeoutMs = autoLockMinutes * 60 * 1000; 
    let timer = setTimeout(logout, timeoutMs);

    function logout() {
      console.log("Auto-lock triggered!");
      localStorage.clear(); 
      window.location.href = "/login"; 
    }

    function resetTimer() {
      clearTimeout(timer);
      timer = setTimeout(logout, timeoutMs);
    }

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [autoLockMinutes]);
}

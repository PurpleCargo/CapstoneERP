import { useEffect, useState } from "react";

export function useLocalStorage2(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error stringifying value for localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
import { useState, useEffect } from "react";

function useLocalStorage(key: string, initialValue: any) {
  // Initialize state with the localStorage value (if it exists) or with the provided initialValue.
  const [data, setData] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    try {
      return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
    } catch (error) {
      return localStorageValue || initialValue;
    }
  });

  // Update localStorage whenever the state changes.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}

export default useLocalStorage;

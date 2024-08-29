import { useEffect, useState } from "react";
import { server_calls } from "../api/server";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export const useGetData = () => {
  const [contactData, setData] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleDataFetch() {
    try {
      const result = await server_calls.get();

      setData(result);
    } catch (error) {
      console.error("Data fetching failed:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    handleDataFetch();
  }, []);

  return { contactData, getData: handleDataFetch, error };
};



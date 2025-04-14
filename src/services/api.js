import { CURRENCY_URL } from '@/constants/api';

export async function getCurrencies() {
  try {
    const response = await fetch(CURRENCY_URL);

    if (!response.ok) {
      throw new Error(`Fetch error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
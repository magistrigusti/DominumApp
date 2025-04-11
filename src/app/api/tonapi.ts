import { Address } from "@ton/core";

const BASE_URL = "https://tonapi.io/v2"; // ✅ Используем v2 API
const API_KEY = process.env.TONAPI_KEY;

export const USDT = Address.parse("AHPIGD2R7DF4RFYAAAAJXXEXNDFNU2F4G3PIJOTCGT2QF67PINKVUVSSLL2CE4TXNOQAZGI");

export async function waitForTransaction(eventId: string, attempts = 0): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await res.json();

    if (!data.in_progress) {
      return data;
    }

    if (attempts > 10) throw new Error("Too many attempts");

    await new Promise((r) => setTimeout(r, 3000));
    return waitForTransaction(eventId, attempts + 1);
  } catch (err) {
    console.error("[waitForTransaction] Ошибка:", err);
    throw err;
  }
}

export async function getJettonWalletAddress(ownerAddress: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/jettons/wallets?account=${ownerAddress}&jetton=${USDT.toString()}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка при получении jetton-кошелька");

  const data = await res.json();
  return data.address; // ⚠️ зависит от структуры ответа
}

"use server";

import { getHouse } from "@/lib/api";

export interface BookingState {
  ok: boolean;
  message: string;
}

const DAY_MS = 1000 * 60 * 60 * 24;

export async function bookHouse(
  _prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  const houseId = String(formData.get("houseId"));
  const checkIn = String(formData.get("checkIn"));
  const checkOut = String(formData.get("checkOut"));

  const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / DAY_MS;
  if (!(nights > 0)) {
    return { ok: false, message: "La fecha de salida debe ser posterior a la de entrada." };
  }

  const house = await getHouse(houseId);
  if (!house) {
    return { ok: false, message: "La casa no existe." };
  }

  return {
    ok: true,
    message: `¡Reserva confirmada! ${nights} noches por ${nights * house.price}€.`,
  };
}
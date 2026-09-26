"use client";

import { useActionState } from "react";
import { bookHouse, type BookingState } from "@/app/houses/[id]/actions";

const initialState: BookingState = { ok: false, message: "" };

export function BookingForm({ houseId }: { houseId: string }) {
  const [state, formAction, isPending] = useActionState(bookHouse, initialState);

  return (
    <form action={formAction} className="mt-10 space-y-4 rounded-lg border-2 p-4">
      <h2 className="text-xl">Reservar</h2>
      <input type="hidden" name="houseId" value={houseId} />

      <div className="flex flex-wrap gap-4">
        <label className="flex flex-col text-sm">
          Entrada
          <input type="date" name="checkIn" required className="rounded border p-2" />
        </label>
        <label className="flex flex-col text-sm">
          Salida
          <input type="date" name="checkOut" required className="rounded border p-2" />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending ? "Reservando..." : "Reservar"}
      </button>

      {state.message && (
        <p className={state.ok ? "text-green-700" : "text-red-700"}>{state.message}</p>
      )}
    </form>
  );
}
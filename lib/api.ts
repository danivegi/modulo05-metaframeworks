import type { House } from "./types";

const API_URL = process.env.API_URL;

export const getImageUrl = (path: string) => `${API_URL}${path}`;

export const getHouses = async (): Promise<House[]> => {
  const res = await fetch(`${API_URL}/api/houses`);
  if (!res.ok) throw new Error("Error al cargar las casas");
  return res.json();
};

export const getHouse = async (id: string): Promise<House | null> => {
  const res = await fetch(`${API_URL}/api/houses/${id}`);
  if (!res.ok) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};
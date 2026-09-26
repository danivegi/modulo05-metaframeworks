import type { House } from "@/lib/types";

export function HouseInfo({ house }: { house: House }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold">Descripción</h2>
        <p>{house.description}</p>
      </div>

      <div>
        <h2 className="font-semibold">Dirección</h2>
        <p>
          {house.address}, {house.city}, {house.country}
        </p>
      </div>

      <ul className="space-y-2">
        <li><strong>Habitaciones</strong>: {house.bedrooms}</li>
        <li><strong>Camas</strong>: {house.beds}</li>
        <li><strong>Baños</strong>: {house.bathrooms}</li>
      </ul>
    </div>
  );
}
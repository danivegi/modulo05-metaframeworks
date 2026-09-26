import { notFound } from "next/navigation";
import { getHouse, getHouses, getImageUrl } from "@/lib/api";
import { BackLink } from "@/components/back-link";
import { HouseInfo } from "@/components/house-info";
import { ReviewList } from "@/components/review-list";
import { BookingForm } from "@/components/booking-form";

export const revalidate = 60;

export async function generateStaticParams() {
  const houses = await getHouses();
  return houses.map((house) => ({ id: house.id }));
}

export default async function HouseDetailPage({
  params,
}: PageProps<"/houses/[id]">) {
  const { id } = await params;
  const house = await getHouse(id);

  if (!house) notFound();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <BackLink />

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold">{house.name}</h1>
        <p className="text-3xl">{house.price}€ / noche</p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <img
          src={getImageUrl(house.image)}
          alt={house.name}
          className="aspect-4/3 w-full rounded object-cover"
        />
        <HouseInfo house={house} />
      </section>

      <BookingForm houseId={house.id} />
      <ReviewList reviews={house.reviews} />
    </main>
  );
}
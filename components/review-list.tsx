import type { Review } from "@/lib/types";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl">Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-lg border-2 p-4">
            <p className="mb-2">Fecha: {review.date}</p>
            <p>
              {review.author}: {review.comment}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
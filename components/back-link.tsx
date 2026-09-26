import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="mb-6 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
    >
      Volver al listado
    </Link>
  );
}
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "linear-gradient(135deg, #3D0812, #6B0F1A)" }}
    >
      <div
        className="text-8xl font-serif font-bold mb-4"
        style={{
          background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </div>
      <h2 className="text-white text-2xl font-serif mb-4">Page Not Found</h2>
      <p className="text-white/60 max-w-md mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/en"
        className="px-8 py-3 rounded-xl font-semibold text-[#3D0812]"
        style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
      >
        Go Home
      </Link>
    </div>
  );
}

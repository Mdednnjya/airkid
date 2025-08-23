import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="overview"
      className="relative h-screen bg-gradient-to-b from-blue-100 to-white flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <div className="text-center md:text-left">
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#8975FF" }}
            >
              Udara Sehat, Anak Sehat
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Lindungi Anak dari Udara Buruk dengan Satu Sentuhan
            </h1>
            <p className="mt-4 text-gray-600">
              Pantau kondisi udara di sekitar dan dapatkan rekomendasi tempat
              bermain yang aman untuk anak Anda.
            </p>
            <Button asChild className="mt-8">
              <Link href="/sign-up">Coba Sekarang</Link>
            </Button>
          </div>

          {/* Right side mock asset */}
          <div className="hidden mt-8 md:mt-0 md:block">
            <Image
              src="/images/hero-illustration.svg"
              alt="AirKid App Mockup"
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
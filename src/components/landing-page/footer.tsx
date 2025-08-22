import Image from "next/image";

export default function Footer() {
  return (
    <footer id="about" className="border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center">
        <div className="block md:hidden flex items-center justify-center">
          <Image 
            src="/images/logo-with-text.png" 
            alt="AirKid Logo" 
            width={100} 
            height={100} 
          />
        </div>
        <div className="text-sm text-gray-600 text-center mt-4 md:mt-0">
          © {new Date().getFullYear()} AirKid. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
import { LineChart, Map, ShieldCheck, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10" style={{ color: '#329BFE' }} />,
      title: "Rekomendasi Hari Ini",
      description: "Dapatkan rekomendasi aktivitas harian yang aman dan sehat berdasarkan prediksi kualitas udara terkini.",
    },
    {
      icon: <Map className="w-10 h-10" style={{ color: '#329BFE' }} />,
      title: "Eksplorasi Lokasi",
      description: "Cari dan temukan informasi lokasi bermain ramah lingkungan terdekat dengan kualitas udara terbaik.",
    },
    {
      icon: <LineChart className="w-10 h-10" style={{ color: '#329BFE' }} />,
      title: "Prediksi Udara",
      description: "Lihat perkiraan kualitas udara beberapa jam hingga hari ke depan untuk membantu Anda merencanakan aktivitas.",
    },
    {
      icon: <User className="w-10 h-10" style={{ color: '#329BFE' }} />,
      title: "Profil Personal",
      description: "Sesuaikan rekomendasi berdasarkan usia, sensitivitas kesehatan, dan preferensi aktivitas anak Anda.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Fitur Kami</h2>
        <p className="mt-4 mx-auto text-md">
          Temukan kemudahan memantau kualitas udara dan mencari rekomendasi tempat bermain yang aman untuk keluarga Anda.
        </p>

        {/* Carousel for Mobile */}
        <div className="md:hidden mt-12 px-16">
          <Carousel className="w-full">
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-xl font-semibold">
                          {feature.title}
                        </CardTitle>
                        <p className="mt-2 text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext />
          </Carousel>
        </div>

        {/* Grid Layout for Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mx-auto bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
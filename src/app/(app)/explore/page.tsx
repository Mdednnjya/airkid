import MapView from "@/components/explore-page/Map-view";

export default function ExplorePage() {
  return (
    <main className="flex flex-col h-screen">
      <header className="p-4 border-b text-center">
        <h1 className="text-2xl font-bold">Explore Eco-Friendly Parks</h1>
        <p className="text-muted-foreground">Discover safe outdoor spaces in Malang.</p>
      </header>
      
      <div className="flex-grow shadow-lg">
        <MapView />
      </div>
    </main>
  );
}
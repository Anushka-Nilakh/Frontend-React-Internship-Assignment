import Gallery from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore curated photography from creators worldwide
          </p>
        </header>

        <main>
          <Gallery />
        </main>
      </div>
    </div>
  );
}

export default App;

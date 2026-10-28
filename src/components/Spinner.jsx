function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4" role="status" aria-label="Loading">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <span className="text-gray-600 text-sm font-medium">Loading photos...</span>
    </div>
  );
}

export default Spinner;


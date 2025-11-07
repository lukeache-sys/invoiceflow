import React, { useState } from 'react';
import Landing from './components/Landing';
import InvoiceApp from './components/InvoiceApp';

export default function App() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <InvoiceApp />;
  }

  return <Landing onStart={() => setShowApp(true)} />;
}

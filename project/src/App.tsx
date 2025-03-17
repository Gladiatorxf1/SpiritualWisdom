import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainHomePage from './pages/MainHomePage';
import Layout from './components/Layout';
import HinduismLayout from './components/HinduismLayout';
import SikhismLayout from './components/SikhismLayout';
import ComingSoonPage from './pages/ComingSoonPage';

// Hinduism pages
import HinduismHomePage from './pages/hinduism/HomePage';
import HinduismChatPage from './pages/hinduism/ChatPage';
import HinduismAboutPage from './pages/hinduism/AboutPage';
import HinduismTeachingsPage from './pages/hinduism/TeachingsPage';

// Sikhism pages
import SikhismHomePage from './pages/sikhism/HomePage';

function App() {
  return (
    <Routes>
      {/* Main platform route */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainHomePage />} />
      </Route>

      {/* Hinduism section with its own layout */}
      <Route path="/hinduism" element={<HinduismLayout />}>
        <Route index element={<HinduismHomePage />} />
        <Route path="chat" element={<HinduismChatPage />} />
        <Route path="about" element={<HinduismAboutPage />} />
        <Route path="teachings" element={<HinduismTeachingsPage />} />
      </Route>

      {/* Sikhism section with its own layout */}
      <Route path="/sikhism" element={<SikhismLayout />}>
        <Route index element={<SikhismHomePage />} />
        <Route path="chat" element={<ComingSoonPage tradition="Sikhism" />} />
        <Route path="about" element={<ComingSoonPage tradition="Sikhism" />} />
        <Route path="teachings" element={<ComingSoonPage tradition="Sikhism" />} />
      </Route>

      {/* Buddhism section (coming soon) */}
      <Route path="buddhism" element={<ComingSoonPage tradition="Buddhism" />} />
    </Routes>
  );
}

export default App;
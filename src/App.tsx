import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Leadership from './pages/Leadership';
import Knowledge from './pages/Knowledge';
import News from './pages/News';
import Articles from './pages/Articles';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import KnowledgeAdmin from './pages/KnowledgeAdmin';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin routes — no Navbar/Footer */}
        <Route path="/manage/knowledge-panel" element={<KnowledgeAdmin />} />
        <Route path="/admin/knowledge" element={<KnowledgeAdmin />} />

        {/* Public routes with layout */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/leadership" element={<Leadership />} />
                  <Route path="/knowledge" element={<Knowledge />} />
                  <Route path="/knowledge/news" element={<News />} />
                  <Route path="/knowledge/articles" element={<Articles />} />
                  <Route path="/knowledge/publications" element={<Publications />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

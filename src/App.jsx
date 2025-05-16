
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import LandingPage from '@/components/landing/LandingPage.jsx';
    import DashboardPage from '@/pages/DashboardPage.jsx';
    import EditorPage from '@/pages/EditorPage.jsx';
    import PreviewPage from '@/pages/PreviewPage.jsx';
    import ViewPage from '@/pages/ViewPage.jsx';
    import { Toaster } from '@/components/ui/toaster.jsx';
    import { PortfolioProvider } from '@/contexts/PortfolioContext.jsx';

    function App() {
      return (
        <PortfolioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/editor/:siteId" element={<EditorPage />} />
              <Route path="/preview/:siteId/:pageId" element={<PreviewPage />} />
              <Route path="/preview/:siteId" element={<PreviewPage />} />
              <Route path="/view/:publicId" element={<ViewPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </PortfolioProvider>
      );
    }

    export default App;
  
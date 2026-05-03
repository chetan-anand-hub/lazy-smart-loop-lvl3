import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/lib/session";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppHome from "./pages/app/AppHome";
import PracticeHub from "./pages/app/PracticeHub";
import WorksheetHub from "./pages/app/WorksheetHub";
import TopicHub from "./pages/app/TopicHub";
import PracticeRun from "./pages/app/PracticeRun";
import WorksheetReady from "./pages/app/WorksheetReady";
import WorksheetAttempt from "./pages/app/WorksheetAttempt";
import CheckPage from "./pages/app/CheckPage";
import CheckResult from "./pages/app/CheckResult";
import MePage from "./pages/app/MePage";
import LoginPage from "./pages/app/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/app" element={<AppHome />} />
            <Route path="/app/practice" element={<PracticeHub />} />
            <Route path="/app/practice/run" element={<PracticeRun />} />
            <Route path="/app/worksheets" element={<WorksheetHub />} />
            <Route path="/app/worksheets/build" element={<WorksheetHub />} />
            <Route path="/app/worksheets/ready" element={<WorksheetReady />} />
            <Route path="/app/worksheets/attempt" element={<WorksheetAttempt />} />
            <Route path="/app/topic-hub" element={<TopicHub />} />
            <Route path="/app/check" element={<CheckPage />} />
            <Route path="/app/check/result" element={<CheckResult />} />
            <Route path="/app/me" element={<MePage />} />
            <Route path="/app/login" element={<LoginPage />} />
            <Route path="/legacy" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

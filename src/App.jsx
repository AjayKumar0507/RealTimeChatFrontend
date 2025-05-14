// import { Switch, Route,Routes } from "wouter";
import { Routes, Route } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/notfound";
import Home from "@/pages/Home";
import { ThemeProvider } from "next-themes";
import './index.css';
import AuthPage from "./pages/auth-page";
import ChatPage from './pages/chat-page';
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      
      <Route path="/auth" element={<AuthPage/>} />
      <Route path="/chat" element={<ChatPage/>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class">
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;

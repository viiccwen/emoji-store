import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import { WagmiProvider } from "wagmi";
import { config } from "./utils/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import About from "./pages/about";
import Purchase from "./pages/purchase";
import Launch from "./pages/launch";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/launch" element={<Launch />} />
              <Route path="*" element={<NotFound />} /> {/* 404 頁面 */}
            </Routes>
          </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

import { ThemeProvider, useTheme } from "@/context/theme-provider";
import Navbar from "./components/Navbar.tsx";
import Heading from "./components/Heading.tsx";
import UserTextArea from "./components/UserTextArea.tsx";
import CountCards from "./components/ui/count-cards.tsx";
import DensityProgressBars from "./components/DensityProgressBars.tsx";

function AppContent() {
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark"
      ? "bg-[url('/src/assets/bg-dark-theme.png')]"
      : "bg-[url('/src/assets/bg-light-theme.png')]";

  return (
    <div
      className={`font-DMSans min-h-dvh bg-cover bg-center ${backgroundImage} p-10`}
    >
      <main className="mx-auto flex max-w-[990px] flex-col gap-12 pt-8 pb-16">
        <Navbar />
        <Heading />
        <UserTextArea />
        <CountCards />
        <DensityProgressBars />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

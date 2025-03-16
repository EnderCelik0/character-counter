import { useTheme } from "@/context/theme-provider";
import bgDark from "../assets/logo-dark-theme.svg";
import bgLight from "../assets/logo-light-theme.svg";
import { ModeToggle } from "./ui/theme-toggle";

export default function Navbar() {
  const { theme } = useTheme();

  const logoURL = theme === "dark" ? bgDark : bgLight;

  return (
    <nav>
      <section className="flex items-center justify-between">
        <img src={logoURL} alt="Logo SVG" />
        <ModeToggle />
      </section>
    </nav>
  );
}

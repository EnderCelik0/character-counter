import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/theme-provider";
import { Button } from "@/components/ui/button.tsx";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex">
      <Button
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`${theme === "dark" ? "bg-neutral-900 text-neutral-500 hover:bg-neutral-800" : "bg-neutral-0 text-neutral-800 hover:bg-neutral-100"} transition-colors duration-300`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="light"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="dark"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-4 w-4 text-white/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

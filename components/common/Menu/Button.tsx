import { forwardRef } from "react";
import { VscMenu } from "react-icons/vsc";

export const MenuButton = forwardRef<
  HTMLButtonElement,
  { onOpen: () => void; expanded?: boolean }
>(({ onOpen, expanded = false }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Open menu"
    aria-haspopup="dialog"
    aria-expanded={expanded}
    className="-mr-2 grid min-h-[44px] min-w-[44px] place-items-center rounded-full transition-colors hover:bg-black/5 md:hidden dark:hover:bg-white/10"
    onClick={onOpen}
  >
    <VscMenu className="h-6 w-6" />
  </button>
));

MenuButton.displayName = "MenuButton";

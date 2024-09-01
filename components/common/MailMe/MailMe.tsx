import { Box, Link } from "@components/ui";

export const MailMe = ({ className = "" }) => (
  <Box className={className}>
    <span className="mr-2 text-sm uppercase opacity-75 font-heading 2xl:text-xs">
      Mail me:
    </span>
    <Link
      className="text-sm uppercase border-b border-slate-500 font-heading hover:text-slate-500 dark:border-slate-100 dark:hover:border-slate-500 2xl:text-xs"
      href="mailto:amirseraj.ir@gmail.com"
    >
      amirseraj.ir@gmail.com
    </Link>
  </Box>
);

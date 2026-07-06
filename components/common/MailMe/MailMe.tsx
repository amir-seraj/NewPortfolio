import { Box, Link } from "@components/ui";

export const MailMe = ({ className = "", email }: { className?: string; email?: string | null }) => {
  const emailAddress = email ?? "amirseraj.ir@gmail.com";
  return (
    <Box className={className}>
      <span className="mr-2 text-sm uppercase opacity-75 font-heading 2xl:text-xs">
        Mail me:
      </span>
      <Link
        // py-2/-my-2 widens the click area without moving the nav layout
        className="-my-2 inline-block border-b border-slate-500 py-2 font-heading text-sm uppercase hover:text-slate-500 dark:border-slate-100 dark:hover:border-slate-500 2xl:text-xs"
        href={`mailto:${emailAddress}`}
      >
        {emailAddress}
      </Link>
    </Box>
  );
};

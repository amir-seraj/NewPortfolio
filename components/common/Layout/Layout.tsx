import { FC, CSSProperties, ReactNode, JSXElementConstructor } from "react";
import { Box } from "@components/ui";
import { SideBar } from "@components/common";

import s from "./Layout.module.scss";
interface Props {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  as?: "div" | "section" | JSXElementConstructor<any>;
  full?: boolean;
  email?: string | null;
}

export const Layout: FC<Props> = ({ children, email }) => {
  return (
    <Box>
      <Box className={s.root}>
        <Box className="md:h-screen">
          <SideBar email={email} />
        </Box>
        <Box className="overflow-x-hidden">
          <main>{children}</main>
        </Box>
      </Box>
    </Box>
  );
};

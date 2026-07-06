import { CSSProperties, FC, ReactNode } from 'react';
import NextLink, { LinkProps } from 'next/link';
import cn from 'classnames';

import s from './Link.module.scss';

interface Props extends LinkProps {
  className?: string;
  onClick?: () => void;
  target?: '_blank' | '_self' | '_parent' | '_top';
  style?: CSSProperties;
  children?: ReactNode;
}

export const Link: FC<Props> = ({
  className = '',
  href,
  onClick,
  children,
  ...rest
}) => {
  const classes = cn(s.root, className);

  // No legacyBehavior: NextLink has rendered the <a> itself since Next 13;
  // the old nested-anchor pattern logged a deprecation error on every page.
  return (
    <NextLink href={href} className={classes} {...rest} onClick={onClick}>
      {children}
    </NextLink>
  );
};

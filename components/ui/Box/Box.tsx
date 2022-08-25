import {
  FC,
  HTMLAttributes,
  CSSProperties,
  ReactNode,
  JSXElementConstructor,
} from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  as?: 'div' | 'section' | 'article' | JSXElementConstructor<any>;
  style?: CSSProperties;
  html?: string;
  children?: ReactNode;
}

export const Box: FC<Props> = ({
  className = '',
  style = {},
  as: Tag = 'div',
  children,
  html,
  ...rest
}) => {
  const htmlProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Tag className={className} style={style} {...rest} {...htmlProps}>
      {children}
    </Tag>
  );
};

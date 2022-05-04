import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import NextJSLink, { LinkProps as NextJSLinkProps } from 'next/link';
import { isRunningInStorybook } from '@utils';
import styles from './Link.module.scss';

interface LinkProps extends NextJSLinkProps {
  className?: string;
  external?: boolean; // Require the use of a non NextJS Link (primarily useful for external links), https://nextjs.org/docs/api-reference/next/link
  openInNewTab?: boolean; // makes the link open in a new tab
  undecorated?: boolean; // make the link text undecorated (make it black and with no underline)
}

/**
 * Custom Link component, which wraps NextJS's link. Can be used in Storybook.
 * Provides the correct styling for a link.
 */
const Link: FunctionComponent<LinkProps> = ({
  className,
  children,
  href,
  external,
  openInNewTab,
  undecorated,
  ...props
}) => {
  const joinedClassNames = cn(className, {
    [styles.link]: !undecorated,
    [styles.undecoratedLink]: undecorated,
  });

  // Create the target that will be used to open link in new tab if necessary
  const target = external || openInNewTab ? '_blank' : '';

  if (isRunningInStorybook() || external) {
    return (
      <div className={joinedClassNames}>
        <a href={href.toString()} target={target} {...props}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={joinedClassNames}>
      <NextJSLink href={href} {...props}>
        <a target={target}>{children}</a>
      </NextJSLink>
    </div>
  );
};

export default Link;

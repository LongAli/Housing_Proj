import { useShouldOverlay } from '@redux';
import cn from 'classnames';
import React, { FunctionComponent } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import styles from './Layout.module.scss';

/**
 * Layout component which provides the navbar, footer, and margin around
 * the body of the website. Wrapped across all pages.
 */
const Layout: FunctionComponent = ({ children }) => {
  const shouldOverlay = useShouldOverlay();

  return (
    <div className={styles.wrapper}>
      <div>
        <NavBar />
        <div className={cn(styles.layout, { 'd-none': shouldOverlay })}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

/**
 * Wrap this around any page to remove the margin in that page.
 * IMPORTANT! Can only be used in a page and must be the outermost
 * element in the page.
 */
export const RemoveLayoutMargin: FunctionComponent = ({ children }) => (
  <div className={styles.undoHorizontalMargin}>{children}</div>
);

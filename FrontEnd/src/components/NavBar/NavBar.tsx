import React, { FunctionComponent, useState } from 'react';
import { Button, ImageDropdown, Link } from '@basics';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { showLogin, showPost } from '@redux';
import { landingIcons, miscIcons } from '@icons';
import { Row } from 'react-bootstrap';
import { useUser } from '@hooks';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import styles from './NavBar.module.scss';

const NavBar: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { data: user, logout } = useUser();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const currentPathName = router?.pathname.slice(1);
  const itemProps = [
    {
      href: '/profile',
      label: 'Profile',
      selected: currentPathName === 'profile',
    },
    {
      label: 'Logout',
      labelClassName: styles.logoutText,
      onClick: () => {
        logout();
        mutate('/api/user');
      },
      selected: currentPathName === 'logout',
    },
  ];

  return (
    <Navbar sticky="top" className={`${styles.wrapper} p-0 m-0 mb-4`}>
      <div className={styles.container}>
        <div className="mr-auto">
          <a href="/housing">
            <landingIcons.logo className={styles.giLogo} />
          </a>
        </div>
        <Row className="align-items-center">
          {user.isLoggedIn ? (
            <>
              <Button
                variant="wrapper"
                onClick={() => dispatch(showPost())}
                className={styles.postImgWrap}
              >
                <miscIcons.post />
              </Button>
              <ImageDropdown
                items={itemProps}
                profileIcon={user.profilePhoto}
                className="ml-4"
              />
            </>
          ) : (
              <>
                <Link href="/about" undecorated>
                  <h5 className="mb-0">About</h5>
                </Link>
                <Button
                  size="secondary"
                  variant="solid"
                  onClick={() => dispatch(showLogin())}
                >
                  Get Started
              </Button>
              </>
            )}
        </Row>
      </div>
    </Navbar>
  );
};

export default NavBar;

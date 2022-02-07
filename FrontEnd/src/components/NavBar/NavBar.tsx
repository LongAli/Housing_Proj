import { Button, ImageDropdown, Link } from '@basics';
import { useUser } from '@hooks';
import { landingIcons, miscIcons } from '@icons';
import { showLogin, showPost } from '@redux';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import styles from './NavBar.module.scss';

const NavBar: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { data: user, logout } = useUser();
  const logoutWithReload = () => {
    logout();
    window.location.reload();
  };
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
      onClick: logoutWithReload,
      selected: currentPathName === 'logout',
    },
  ];

  return (
    <Navbar sticky="top" className={`${styles.wrapper} p-0 m-0 mb-4`}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <a href="/housing">
            <landingIcons.newLogo className={styles.logo} />
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
              <Button
                size="primary"
                variant="wrapper"
                onClick={() => router.push('/about')}
              >
                About
              </Button>
              <Button
                size="primary"
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

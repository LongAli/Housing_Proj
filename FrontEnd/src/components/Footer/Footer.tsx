import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './Footer.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Subtitle2, Button } from '@basics';
import { miscIcons } from '@icons';
// import { showLogin } from '@redux';
// import { useDispatch } from 'react-redux';

const FirstColumn: FunctionComponent = () => {
  return (
    <div className={cn(styles.marginBottomProvider)}>
      <Link href="/housing" undecorated>
        <miscIcons.newLogo />
      </Link>
      <div className={styles.logoTextWrap}>
        <div className={styles.logoText}>By Students</div>
        <div className={styles.logoText}>For Students</div>
        <div className={styles.logoText}>With Students</div>
      </div>
    </div>
  );
};

const homehubEmail = 'homehubdope@gmail.com';

// const Email = () => (
//   <Link href={`mailto:${homehubEmail}`} external undecorated>
//     <div className={cn(styles.greyedOut, styles.email, styles.childrenText)}>
//       {homehubEmail}
//     </div>
//   </Link>
// );

const SecondColumn: FunctionComponent = () => (
  <div className={styles.marginBottomProvider}>
    <Row>
      <Col xs={1} md={2}>
        <div className={styles.footerIcon}>
          <miscIcons.footerStart />
        </div>
      </Col>
      <Col className={styles.titleText} xs={9} md={8}>
        <Subtitle2>Start</Subtitle2>
        <div className={styles.linkSection}>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>Make a Post</div>
          </Link>
          <Link href={`mailto:${homehubEmail}`} undecorated>
            <div className={styles.childrenText}>Sign Up</div>
          </Link>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>LogIn</div>
          </Link>
        </div>
      </Col>
    </Row>
  </div>
);

const ThirdColumn: FunctionComponent = () => (
  <div className={cn(styles.marginBottomProvider)}>
    <Row>
      <Col xs={1} md={2}>
        <div className={styles.footerIcon}>
          <miscIcons.footerExplore />
        </div>
      </Col>
      <Col className={styles.titleText} xs={9} md={8}>
        <Subtitle2>Explore</Subtitle2>
        <div className={styles.linkSection}>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>Home</div>
          </Link>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>About Us</div>
          </Link>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>Careers</div>
          </Link>
        </div>
      </Col>
    </Row>
  </div>
);

const FourthColumn: FunctionComponent = () => (
  <div className={cn(styles.marginBottomProvider)}>
    <Row>
      <Col xs={1} md={2}>
        <div className={styles.footerIcon}>
          <miscIcons.footerConnect />
        </div>
      </Col>
      <Col className={styles.titleText} xs={9} md={8}>
        <Subtitle2>Connect</Subtitle2>
        <div className={styles.linkSection}>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>Feedback</div>
          </Link>
          <Link href={`mailto:${homehubEmail}`} undecorated>
            <div className={styles.childrenText}>Email</div>
          </Link>
          <Link href="/" undecorated>
            <div className={styles.childrenText}>Instagram</div>
          </Link>
        </div>
      </Col>
    </Row>
  </div>
);

const CopyRight: FunctionComponent = () => (
  <div className={styles.copyRighttext}>
    &copy; All rights reserved | Homehub 2021
  </div>
);
/**
 * The footer of the website. No Props because there shouldn't
 * be any configuration necessary.
 */
const Footer: FunctionComponent = () => (
  <footer>
    <div className={styles.wrapper}>
      {/* <Container> */}
      <Row>
        <Col xs={12} md={{ offset: 0, span: 5 }} lg={{ offset: 1, span: 5 }}>
          <FirstColumn />
        </Col>

        <Col xs={12} md={2} lg={2}>
          <SecondColumn />
        </Col>

        <Col xs={12} md={2} lg={2}>
          <ThirdColumn />
        </Col>

        <Col xs={12} md={2} lg={2}>
          <FourthColumn />
        </Col>
      </Row>
      {/* </Container> */}
      <Row className={styles.copyRight}>
        <CopyRight />
      </Row>
    </div>
  </footer>
);

export default Footer;

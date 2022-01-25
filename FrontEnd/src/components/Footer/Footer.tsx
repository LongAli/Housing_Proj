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
            <div className={styles.childrenText}>Home</div>
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
          <Link href="/about" undecorated>
            <div className={styles.childrenText}>About Us</div>
          </Link>
          <Link
            external
            href="https://docs.google.com/document/d/1SpX8jEUbn7z77oRPYZTIaw8ZR8wTqfi5U0lQ-THEK-g/edit?usp=sharing"
            undecorated
          >
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
          <Link href={`mailto:${homehubEmail}`} undecorated>
            <div className={styles.childrenText}>Email</div>
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
  <footer className={styles.footer}>
    <div className={styles.wrapper}>
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
      <Row className={styles.copyRight}>
        <CopyRight />
      </Row>
    </div>
  </footer>
);

export default Footer;

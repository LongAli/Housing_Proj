import { FilledImage, Link, Body2, Subtitle2, Button } from '@basics';
import { RemoveLayoutMargin } from '@components';
import { TriggerPageView } from '@components/ga';
import { howToPost, landingIcons, miscIcons, landingLogin } from '@icons';
import { spawn } from 'child_process';
import cn from 'classnames';
import { useRouter } from 'next/dist/client/router';
import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Col, Row } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import styles from './LandingPage.module.scss';
import { useUser, useViewPortDistance } from '@hooks';
import { useDispatch } from 'react-redux';
import { showLogin, useShowPostType, showPost } from '@redux';
import { BrowsingStudentList, HouseCardList } from '@components';

const HomehubWelcomeInfo: FunctionComponent = () => {
  useEffect(() => {
    TriggerPageView('landing_page');
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.text}>Welcome to</div>
        <landingIcons.newLogo className={styles.logo} />
        <div className={styles.text}>Find UCSD Off-Campus Housing</div>
        <div className={styles.byStudents}>
          <div className={styles.by}>
            <Typewriter
              options={{
                strings: ['By', 'With', 'For'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className={styles.students}>students</div>
        </div>
      </div>
      <landingIcons.bannerGeisel className={styles.bannerGeisel} />
    </div>
  );
};

const HomePageCard: FunctionComponent = () => {
  const router = useRouter();
  const { data: user } = useUser();
  const dispatch = useDispatch();

  return (
    <Row className={styles.homePageCardRow}>
      <Col md={12} lg={5} className={styles.homePageCardCol}>
        <div className={styles.homePageCard}>
          <FilledImage
            alt={`house illustration`}
            src={landingIcons.cardHouse}
            className={styles.cardImage}
          />
          <div className={styles.cardBottom}>
            <div className={styles.homePageCardText}>
              <div className={styles.homePageCardTextTitle}>Have a place?</div>
              <div className={styles.text}>
                Post your place now so that your ideal roommates/ suitemates can
                find you ASAP
              </div>
            </div>
            <Button
              onClick={() => {
                user.isLoggedIn ? dispatch(showPost()) : dispatch(showLogin());
              }}
            >
              {user.isLoggedIn ? 'Post it now' : 'Log in to post'}
            </Button>
          </div>
        </div>
      </Col>
      <Col
        md={12}
        lg={{ span: 5, offset: 2 }}
        className={styles.homePageCardCol}
      >
        <div className={styles.homePageCard}>
          <FilledImage
            alt={`people illustration`}
            src={landingIcons.cardPeople}
            className={styles.cardImage}
          />
          <div className={styles.cardBottom}>
            <div className={styles.homePageCardText}>
              <div className={styles.homePageCardTextTitle}>
                Looking for a place?
              </div>
              <div className={styles.text}>
                Check out the listings from others to filter the ones that meet
                your criteria
              </div>
            </div>
            <Button
              size="primary"
              variant="solid"
              onClick={() => router.push('/housing')}
            >
              Explore listings
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

interface postStepProps {
  stepNumber: number;
  stepDescription: string;
}

const PostYourPlace: FunctionComponent = () => {
  const [currentPostStep, setCurrentPostStep] = useState(1);
  const isCurrentStep = (step: number) => step === currentPostStep;

  type HowToPostKey = keyof typeof howToPost;

  const PostStep: FunctionComponent<postStepProps> = ({
    stepNumber,
    stepDescription,
  }) => (
    <>
      <div className={styles.postStepNormalScreen}>
        <div className={styles.postStepNormalScreenDescription}>
          <span
            className={styles.postStepNormalScreenText}
          >{`${stepNumber} - ${stepDescription}`}</span>
        </div>
        <div className={cn(styles.stepImageNormalScreen)}>
          <FilledImage
            src={howToPost[`step${stepNumber}` as HowToPostKey]}
            className={styles.stepImage}
          />
        </div>
      </div>
      <div
        className={styles.postStepLargeScreen}
        onMouseEnter={() => setCurrentPostStep(stepNumber)}
      >
        <div
          className={cn(styles.postStepLargeScreenDescription, {
            [styles.postStepLargeScreenDescriptionActive]: isCurrentStep(
              stepNumber,
            ),
          })}
        >
          <span
            className={cn(styles.postStepLargeScreenText, {
              [styles.postStepLargeScreenTextActive]: isCurrentStep(stepNumber),
            })}
          >
            {`${stepNumber} - ${stepDescription}`}
          </span>
        </div>
        <div className={styles.postStepLargeScreenArrowWrapper}>
          <span
            className={cn(styles.postStepLargeScreenArrow, {
              [styles.currentStep]: isCurrentStep(stepNumber),
            })}
          >
            <miscIcons.orangeArrow />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.postPlace}>
      <h3 className={styles.stepsHeading}> Post Your Place</h3>
      <Row className={styles.stepsWrapper}>
        <Col md={5}>
          <PostStep stepNumber={1} stepDescription="Start with school email" />
          <PostStep stepNumber={2} stepDescription="Introduce your place" />
          <PostStep stepNumber={3} stepDescription="Preview and post" />
          <PostStep stepNumber={4} stepDescription="Contact via phone/email" />
        </Col>
        <Col>
          <FilledImage
            src={howToPost[`step${currentPostStep}` as HowToPostKey]}
            className={cn(styles.stepImage, styles.stepImageLargeScreen)}
          />
        </Col>
      </Row>
    </div>
  );
};

const LogIn: FunctionComponent = () => {
  const { data: user } = useUser();
  const dispatch = useDispatch();
  const [loginMoved, setLoginMoved] = useState(false);
  const [logInCol, setlogInCol] = useState(7);
  const [windowHeight, elementDistanceToTop] = useViewPortDistance(
    '#loginFrame',
  );

  useEffect(() => {
    if (user.isLoggedIn) {
      setlogInCol(12);
    }

    if (
      windowHeight &&
      elementDistanceToTop &&
      windowHeight - elementDistanceToTop > 0
    ) {
      setLoginMoved(true);
    }
  }, [windowHeight, elementDistanceToTop]);

  return (
    <div className={styles.loginSession}>
      <Row>
        <Col
          xs={{ span: 5, order: 'last' }}
          lg={{ offset: 1, span: 2, order: 'first' }}
        >
          <FilledImage
            alt={`Sun God Image`}
            src={landingIcons.SunGod}
            className={styles.sunGod}
          />
        </Col>

        <Col
          xs={{ span: 12, order: 'first' }}
          lg={8}
          className={styles.bearText}
        >
          <Row>
            <Col xs={{ offset: 9, span: 2 }}>
              <FilledImage
                alt={`Bear Image`}
                src={landingIcons.Bear}
                className={styles.bearImage}
              />
            </Col>
          </Row>

          <div
            className={cn(styles.loginFrame, {
              [styles.loginFrameMoved]: loginMoved,
            })}
            id="loginFrame"
          >
            <Row>
              <Col className={styles.loginText} md={logInCol} xs={12}>
                <Body2>
                  Homehub requests a
                  <span className="font-weight-bold"> UCSD email</span> to
                  ensure the authenticity of people signing up!
                </Body2>
              </Col>
              {!user.isLoggedIn && (
                <Col md={5} xs={12}>
                  <Button
                    size="primary"
                    variant="solid"
                    icon={{ icon: miscIcons.GoogleLogo }}
                    onClick={() => dispatch(showLogin())}
                    className={styles.loginButton}
                  >
                    Start with school account
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const BrowseListing: FunctionComponent = () => {
  const showPostType = useShowPostType();
  const router = useRouter();
  return (
    <div className={styles.findWrapper}>
      {/* change backgorund color, plain cards (no data) -> animation -> data */}
      {/* slide show */}
      <h3 className={styles.findHeading}>Find Your Spot</h3>
      <Row className={styles.findWrapper}></Row>
      <div>
        <div className={styles.houseCardWrapper}>
          <HouseCardList
            postType={showPostType}
            numListingsShown={5}
          ></HouseCardList>
        </div>
        <div className={cn(styles.center, styles.exploreButton)}>
          <Button onClick={() => router.push('/housing')}>
            <div>Explore listings</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

const OurMission: FunctionComponent = () => {
  return (
    <>
      <Row className={styles.ourMissonWrapper}>
        <Col className={styles.ourMissionTextCol} xl={5}>
          <div className={styles.ourMissionTextColHeader}>Our Mission</div>
          <div className={styles.ourMissionTextColDescription}>
            {`To reduce the hassle of living off-campus and dealing with real-world problems for students.`}
          </div>
          <Link href="/about" undecorated>
            <Button
              variant="outline"
              className={styles.ourMissionTextColButton}
            >
              Learn About Homehub
            </Button>
          </Link>
        </Col>
        <Col xl={7}>
          <FilledImage
            src={landingIcons.ourMission}
            className={styles.ourMissionImage}
          />
        </Col>
      </Row>
      <Row className={styles.backgroundHouse}>
        <landingIcons.backgroundHouse />
      </Row>
    </>
  );
};

const Landing: FunctionComponent = () => {
  return (
    <RemoveLayoutMargin>
      <div className={styles.background}>
        <HomehubWelcomeInfo />

        <HomePageCard />

        <PostYourPlace />

        <BrowseListing />

        <LogIn />

        <OurMission />
      </div>
    </RemoveLayoutMargin>
  );
};

export default Landing;

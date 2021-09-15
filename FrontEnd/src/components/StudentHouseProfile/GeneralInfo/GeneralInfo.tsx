import React, { FunctionComponent, useState } from 'react';
import styles from './GeneralInfo.module.scss';
import { Map, Tooltip, Link } from '@basics';
import { miscIcons } from '@icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface GeneralInfoProps {
  address: string;
  distance: string;
  placeName: string;
}

const getTransitRoute = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${address}&destination=Price+Center,+La+Jolla,+CA+92093&travelmode=transit`;

const GeneralInfo: FunctionComponent<GeneralInfoProps> = ({
  address,
  distance,
  placeName,
}) => {
  const [copied, setCopy] = useState(false);
  
  return (
    <div className={styles.textPortion}>
      <div className={styles.name}>{placeName}</div>
      <div className={styles.address}>
        <miscIcons.LocationIcon />
        <div className={styles.addressText}>{address}</div>
        <Tooltip
          isSingleLine
          hideInfoIcon
          title="Copied to clipboard!"
          className={styles.copy}
          placement="top"
          open={copied}
          onClose={() => setCopy(false)}
        >
          <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
            <miscIcons.copy />
          </CopyToClipboard>
        </Tooltip>
      </div>
      <div className={styles.distanceWrapper}>
        <div>
          <div className={styles.distanceText}>
            <miscIcons.busIcon />~{distance}
            <div className={styles.note}>
              (Time vary based on real-time traffic)
            </div>
          </div>
          <div className={styles.transitText}>
            public transit from Price Center
          </div>
        </div>
        <Link
          className={styles.directionLink}
          href={getTransitRoute(address)}
          external
        >
          <miscIcons.directions className="mr-auto" />
        </Link>
      </div>
      <Map address={address} className={styles.map} />
    </div>
  );
};

export default GeneralInfo;

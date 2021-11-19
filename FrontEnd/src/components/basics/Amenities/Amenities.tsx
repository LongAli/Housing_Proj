import React, { FunctionComponent } from 'react';
import { amenityIcons, IconProps } from '@icons';
import Col, { ColProps } from 'react-bootstrap/Col';
import styles from './Amenities.module.scss';
import cn from 'classnames';
import { Body2 } from '@basics';

export const amenityToIcon = {
  'A/C': amenityIcons.CeilingFan,
  'Balcony / Patio': amenityIcons.BalconyPatio,
  Bath: amenityIcons.Bath,
  Calendar: amenityIcons.Calendar,
  'Cat Friendly': amenityIcons.CatFriendly,
  'Ceiling Fan': amenityIcons.CeilingFan,
  Clubhouse: amenityIcons.Clubhouse,
  Dishwasher: amenityIcons.Dishwasher,
  'Dog Friendly': amenityIcons.DogFriendly,
  Elevator: amenityIcons.Elevator,
  Furnished: amenityIcons.Furnished,
  'Fitness Center': amenityIcons.Gym,
  Gym: amenityIcons.Gym,
  'Walk-in Closets': amenityIcons.Hanger,
  'Hardwood Floor': amenityIcons.HardwoodFloor,
  'Parking Garage': amenityIcons.IndoorParking,
  'Indoor Parking': amenityIcons.IndoorParking,
  'Indoor Laundry': amenityIcons.IndoorWasher,
  'In-unit Laundry': amenityIcons.IndoorWasher,
  'On-site Movie Theater': amenityIcons.MovieTheater,
  'On-site Storage': amenityIcons.OnsiteStorage,
  'Outdoor Parking': amenityIcons.OutdoorParking,
  Parking: amenityIcons.Parking,
  'Pet Friendly': amenityIcons.PetsFriendly,
  'Pets Friendly': amenityIcons.PetsFriendly,
  'Pool Tables': amenityIcons.Pool,
  'Common Space': amenityIcons.SharedCommonSpace,
  'Smoke Free': amenityIcons.SmokeFree,
  'Living Room': amenityIcons.SharedCommonSpace,
  'No Smoking': amenityIcons.SmokeFree,
  'Swimming Pool': amenityIcons.SwimmingPool,
  'Tennis Courts': amenityIcons.TennisCourt,
};

export type Amenity = keyof typeof amenityToIcon;

export const allAmenityKeys = Object.keys(amenityToIcon) as [
  keyof typeof amenityToIcon,
];

// TODO extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
interface AmenitiesProps extends ColProps {
  /**
   * The selected amenities to render. If `undefined`, all of them will be rendered
   * (set selected to be an empty array if you don't want any to be rendered)
   */
  selected?: Amenity[];

  /**
   * Component that wraps every icon (icon is passed as `children`)
   */
  // TODO iconWrapper?: FunctionComponent<any> | Component<any, any, any>;
  // temporary below
  useCol?: boolean;

  /**
   * Select which variant of the Icon/Label pair you want. By default, `horizontal` is selected.
   * `horizontal` -> IconHere  LabelHere
   *
   * `vertical` ->  IconHere
   *           LabelHere
   *
   * `onlyIcon` -> IconHere
   *
   * `onlyLabel` -> LabelHere
   */
  variant?: 'horizontal' | 'vertical' | 'onlyIcon' | 'onlyLabel';

  /**
   * Props to pass through to the icon
   */
  iconProps?: IconProps;

  colClassName?: string;

  extraContent?: any;
}

const Amenities: FunctionComponent<AmenitiesProps> = ({
  selected: selectedByProp,
  // TODO iconWrapper: IconWrapper = Col,
  variant = 'horizontal',
  useCol,
  iconProps,
  className,
  colClassName,
  extraContent,
  ...props
}) => {
  const selected = selectedByProp || allAmenityKeys;

  const Wrapper: FunctionComponent<any> = (props) =>
    useCol ? <Col {...props} /> : <div {...props} />;

  return (
    <div className={cn(styles.wrapperDefault, className)}>
      {selected.map((s) => {
        const SelectedIcon = amenityToIcon[s];
        const Icon = () => (variant !== 'onlyLabel' ? <SelectedIcon /> : null);
        const Label = () =>
          variant !== 'onlyIcon' ? <Body2 className="ml-1">{s}</Body2> : null;

        return (
          // TODO should return the icon wrapper... but not sure what the type should be
          <Wrapper
            className={cn(styles.default, colClassName, {
              [styles.vertical]: variant === 'vertical',
            })}
            {...props}
          >
            <div>
              <Icon {...iconProps} /> <Label />
            </div>
          </Wrapper>
        );
      })}

      <Wrapper className={cn(styles.default, colClassName)} {...props}>
        {extraContent}
      </Wrapper>
    </div>
  );
};

export default Amenities;

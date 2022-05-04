import React, { FunctionComponent } from 'react';
import { IconProps, Icon as IconType } from '@icons';
import Col, { ColProps } from 'react-bootstrap/Col';
import AmenityIcon, {
  Amenity,
  allAmenityKeys,
} from '@basics/Amenities/AmenityIcon';
import cn from 'classnames';
import Body2 from '@basics/Body2';
import styles from './Amenities.module.scss';

type Variant = 'horizontal' | 'vertical' | 'onlyIcon' | 'onlyLabel';
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
  variant?: Variant;

  /**
   * Props to pass through to the icon
   */
  iconProps?: IconProps;

  colClassName?: string;

  extraContent?: any;
}

const Wrapper: FunctionComponent<any> = (props, useCol) =>
  (useCol ? <Col {...props} /> : <div {...props} />);

const Label: FunctionComponent<{ s: Amenity; variant: Variant }> = ({
  s,
  variant,
}) => (variant !== 'onlyIcon' ? <Body2 className="ml-1">{s}</Body2> : null);

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
  let selectedIcon: IconType;

  return (
    <div className={cn(styles.wrapperDefault, className)}>
      {selected.map((s) => {
        selectedIcon = <AmenityIcon amenity={s} />;
        const Icon = () => (variant !== 'onlyLabel' ? selectedIcon : null);

        return (
          // TODO should return the icon wrapper... but not sure what the type should be
          <Wrapper
            className={cn(styles.default, colClassName, {
              [styles.vertical]: variant === 'vertical',
            })}
            useCol={useCol}
            {...props}
          >
            <div>
              <Icon {...iconProps} />
              {' '}
              <Label variant={variant} s={s} />
            </div>
          </Wrapper>
        );
      })}

      <Wrapper
        className={cn(styles.default, colClassName)}
        useCol={useCol}
        {...props}
      >
        {extraContent}
      </Wrapper>
    </div>
  );
};

export default Amenities;

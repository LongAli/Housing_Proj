import React, { FunctionComponent } from 'react';
import { Icon as IconType, miscIcons, amenityIcons } from '@icons';

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

// isAmenity is a type guard to check if key is of Amenity type
export const isAmenityIcon = (key: any): key is Amenity => key in amenityToIcon;

interface AmentiyIconProps {
  amenity: Amenity;
}

// Fallback Icon Component returns an amenity Icon if it is in the list of amenity icons
// otherwise, returns a fallback Icon
const AmenityIcon: FunctionComponent<AmentiyIconProps> = ({ amenity }) => {
  const Icon: IconType = isAmenityIcon(amenity)
    ? amenityToIcon[amenity]
    : miscIcons.fallback;
  return <Icon />;
};

export default AmenityIcon;

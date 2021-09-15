import { Amenity } from '@basics';
import { Gender, Habit, RoomType } from '@constants';

export interface HousePost {
  name: string;
  address: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  earlyDate: string;
  lateDate: string;
  roomType: string;
  leaserName: string;
  leaserEmail: string;
  leaserPhone: string;
  leaserSchoolYear: string;
  leaserMajor: string;
  photos: string[];
  profilePhoto: string;
  roomId: number;
  other: string[];
  facilities: Amenity[];
  negotiable: boolean;
  numBaths: string;
  numBeds: string;
  roomDescription: string;
}

export interface HousePostUIData
  extends Omit<HousePost, 'roomId' | 'roomType'> {
  formattedMoveIn: string;
  roomType: RoomType;
}

export interface LandlordHousePost {
  name: string;
  icon: string;
  address: string;
  distance: string;
  rent: string;
  roomType: string;
  availability: string;
  leaseTerm: string;
  petPolicy: string;
  parking: string;
  utilityDetails: string;
  facility: Amenity[]; // TODO change key to 'amenities'
  applicationFee: string;
  holdingPeriod: string;
  holdingDeposit: string;
  housingDeposit: string;
  verification: string;
  proofOfIncome: string;
  images: string[];
  website: string;
  phone: string;
  email: string;
}

// all values on the frontend are strings since they are native to inputs
// they will be (if valid) transformed to required types when sent to backend
export interface StudentHousePost {
  isPreview?: boolean;
  photos: File[];
  address: string;
  distance: string;
  placeName: string;
  rent: string;
  numBed: string; // will be converted to int after sending to backend
  numBath: string; // will be converted to float after sending to backend
  utility?: string;
  roomType: string;
  roomCapacities: string[];
  lookingForCount: string; // will be converted to int after sending to backend
  availMonth: string;
  availYear: string;
  untilMonth: string;
  untilYear: string;
  amenities: Amenity[];
  startDate: string;
  endDate: string;
  genders: Gender[];
  habits: Habit[];
  placeDescription: string;
  userName: string;
  major: string;
  schoolYear: string;
  userBio: string;
  userEmail: string;
  userPhone: string;
  userPhoto: string;
}

export type StudentHousePostConsume = Omit<StudentHousePost, 'photos'> & {
  photos: string[];
};

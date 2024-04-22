import './MockData'
import { MOCKmay } from './MockData'

const maleCount = MOCKmay.filter(entery => entery.gender === 'male').length;
const femaleCount = MOCKmay.filter(entery => entery.gender === 'female').length;

const totalCount = maleCount + femaleCount;
const malePercentage = (maleCount/totalCount) * 100;
const femalePercentage = (femaleCount/totalCount) * 100;

export const pieData = [
    { name: 'Male', value: malePercentage },
    { name: 'Female', value: femalePercentage },
];
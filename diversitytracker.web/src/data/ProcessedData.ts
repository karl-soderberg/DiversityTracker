import './MockData'
import { MOCKmay } from './MockData'

const maleCount = MOCKmay.filter(entery => entery.gender === 'male').length;
const femaleCount = MOCKmay.filter(entery => entery.gender === 'female').length;

export const pieData = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount },
];
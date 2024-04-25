import './MockData'
import { MOCKmay, MOCKjune } from './MockData'


//FILTERING FOR PIECHART
const maleCount = MOCKmay.filter(entery => entery.gender === 'male').length;
const femaleCount = MOCKmay.filter(entery => entery.gender === 'female').length;

const totalCount = maleCount + femaleCount;
const malePercentage = (maleCount/totalCount) * 100;
const femalePercentage = (femaleCount/totalCount) * 100;

export const pieData = [
    { name: 'Male', value: malePercentage },
    { name: 'Female', value: femalePercentage },
];

//FILTERING FOR SCATTER
export const scatterMaleData = MOCKjune.filter(entery => entery.gender === 'male')
export const scatterFemaleData = MOCKjune.filter(entery => entery.gender === 'female')

//FILTERING FOR BARCHART
import './MockData'
import { MOCKmay, MOCKjune, MOCKjuly } from './MockData'


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
const groupedData: { [key: string]: { gender: string; agreeLevel: number; count: number } } = {};
MOCKjuly.forEach(item => {
  const key = `${item.gender}-${item.agreeLevel}`;
  if (!groupedData[key]) {
    groupedData[key] = { gender: item.gender, agreeLevel: item.agreeLevel, count: 1 };
  } else {
    groupedData[key].count++;
  }
});
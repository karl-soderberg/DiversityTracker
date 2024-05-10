import React, { useState } from 'react';

type ChartType = 'distributionscale' | 'distributionacrosstime' | 'scatterdistribution' | 'barchartdistribution' | 'genderdistribution';

type ChartBtnProps = {
    type: ChartType;
    title: string;
    svgContent: JSX.Element;
    isActive: boolean;
    onSelect: (type: ChartType) => void;
}

const ChartButton = ({ type, title, svgContent, isActive, onSelect }: ChartBtnProps) => {
    return (
        <a onClick={() => onSelect(type)} 
           className={`chartpage__selectcharttype__anchor ${isActive ? 'active' : ''}`}>
            {svgContent}
            <p className="selectcharttype__anchor--title">{title}</p>
        </a>
    );
};

type ChartSelectorProps = {
    chartType: string,
    setChartType: (type: string) => void
}

const ChartSelector = ({ chartType, setChartType }: ChartSelectorProps) => {

    const handleSelectChartType = (type: ChartType) => {
        setChartType(type);
    };

    return (
        <section className="chartpage__selectcharttype">
            <ChartButton 
                type="distributionscale" 
                title="Distribution Scale" 
                svgContent={
                    <svg width="40px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px">
                        <path d="M89.5,90.5H9.5V10a1,1,0,0,1,2,0V88.5h78a1,1,0,0,1,0,2Z" stroke="#F6F6F6" stroke-width="7"/>
                        <path d="M18,82a1,1,0,0,1,0-2c7.28,0,11.23-11.6,15.05-22.82C37.1,45.29,41.28,33,50,33S63.5,45.3,68,57.2C72.1,67.92,76.31,79,83,79a1,1,0,0,1,0,2c-8.07,0-12.33-11.21-16.85-23.09C61.87,46.65,57.44,35,50,35c-7.28,0-11.23,11.6-15.05,22.82C30.9,69.71,26.72,82,18,82Z" stroke="#F6F6F6" stroke-width="2"/>
                    </svg>
                }
                isActive={chartType === 'distributionscale'} 
                onSelect={handleSelectChartType} 
            />
            <ChartButton 
                type="distributionacrosstime" 
                title="Distribution Across Time" 
                svgContent={
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M6 15L10 11L14 15L20 9M20 9V13M20 9H16" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                } 
                isActive={chartType === 'distributionacrosstime'} 
                onSelect={handleSelectChartType} 
            />
            <ChartButton 
                type="scatterdistribution" 
                title="Scatter Distribution" 
                svgContent={
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M9 15H9.01M16 13H16.01M10 10H10.01M17 8H17.01" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                }
                isActive={chartType === 'scatterdistribution'} 
                onSelect={handleSelectChartType} 
            />
            <ChartButton 
                type="barchartdistribution" 
                title="Barchart Distribution" 
                svgContent={
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 14.6C3 14.0399 3 13.7599 3.10899 13.546C3.20487 13.3578 3.35785 13.2049 3.54601 13.109C3.75992 13 4.03995 13 4.6 13H5.4C5.96005 13 6.24008 13 6.45399 13.109C6.64215 13.2049 6.79513 13.3578 6.89101 13.546C7 13.7599 7 14.0399 7 14.6V19.4C7 19.9601 7 20.2401 6.89101 20.454C6.79513 20.6422 6.64215 20.7951 6.45399 20.891C6.24008 21 5.96005 21 5.4 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V14.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 4.6C10 4.03995 10 3.75992 10.109 3.54601C10.2049 3.35785 10.3578 3.20487 10.546 3.10899C10.7599 3 11.0399 3 11.6 3H12.4C12.9601 3 13.2401 3 13.454 3.10899C13.6422 3.20487 13.7951 3.35785 13.891 3.54601C14 3.75992 14 4.03995 14 4.6V19.4C14 19.9601 14 20.2401 13.891 20.454C13.7951 20.6422 13.6422 20.7951 13.454 20.891C13.2401 21 12.9601 21 12.4 21H11.6C11.0399 21 10.7599 21 10.546 20.891C10.3578 20.7951 10.2049 20.6422 10.109 20.454C10 20.2401 10 19.9601 10 19.4V4.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 10.6C17 10.0399 17 9.75992 17.109 9.54601C17.2049 9.35785 17.3578 9.20487 17.546 9.10899C17.7599 9 18.0399 9 18.6 9H19.4C19.9601 9 20.2401 9 20.454 9.10899C20.6422 9.20487 20.7951 9.35785 20.891 9.54601C21 9.75992 21 10.0399 21 10.6V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H18.6C18.0399 21 17.7599 21 17.546 20.891C17.3578 20.7951 17.2049 20.6422 17.109 20.454C17 20.2401 17 19.9601 17 19.4V10.6Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                }
                isActive={chartType === 'barchartdistribution'} 
                onSelect={handleSelectChartType} 
            />
            <ChartButton 
                type="genderdistribution" 
                title="Gender Distribution" 
                svgContent={
                    <svg width="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M20 10C20 6.13401 16.866 3 13 3V10H20Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                }
                isActive={chartType === 'genderdistribution'} 
                onSelect={handleSelectChartType} 
            />
        </section>
    );
};

export default ChartSelector;
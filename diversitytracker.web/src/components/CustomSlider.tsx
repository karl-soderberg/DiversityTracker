import {useState } from 'react';
import './CustomSlider.css'

type SliderProps = {
  min: number,
  max: number,
  step: number,
  onChange: (value: number) => void,
}

export const CustomSlider = ({min, max, step, onChange }: SliderProps) => {
    const [value, setValue] = useState((max + min) / 2 - 1.8);
    const [compensatorValue, setCompensatorValue] = useState(1.8);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        
        let newCompensatorValue = 1.8 - (newValue / 100) * 3.6; // Map value to range -1.5 to 1.5
        setCompensatorValue(newCompensatorValue);

        setValue(newValue);
        onChange(newValue);
    }

    return (
        <section className="slider-container">
            <label className='slider__label' htmlFor="">Office Enviroment Comfort</label>
            <div className='slider__overlay' style={{ left: `${value+compensatorValue}%`, transform: `translateX(-50%)`}}>
                {value}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                onChange={handleSliderChange}
                className="slider"
            />
        </section>
    );
}

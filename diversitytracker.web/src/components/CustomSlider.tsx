import {useEffect, useRef, useState } from 'react';
import './CustomSlider.css'

type SliderProps = {
  min: number,
  max: number,
  step: number,
  text: string,
  onChange: (value: number) => void,
}

export const CustomSlider = ({min, max, step, text, onChange }: SliderProps) => {
    const [value, setValue] = useState((max + min) / 2 - 1.8);
    const [compensatorValue, setCompensatorValue] = useState(2);
    const emotionIconRef = useRef<HTMLDivElement>(null);
    const animationInstance = useRef<any>(null);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        
        let newCompensatorValue = 4.7 - (newValue / 100) * 9.4; // Map value to range -1.5 to 1.5
        setCompensatorValue(newCompensatorValue);

        setValue(newValue);
        onChange(newValue);
    }


    useEffect(() => {
        if (emotionIconRef.current && !animationInstance.current) {
            animationInstance.current = lottie.loadAnimation({
                container: emotionIconRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: './src/resources/animations/moodScaleAnimation2.json'
            });
        }

        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (animationInstance.current) {
            animationInstance.current.goToAndStop(value, true);
        }
    }, [value]);

    return (
        <section className="slider-container">
            <label className='slider__label' htmlFor="">{text + " " /*+ Math.round(value / 10)*/}</label>
            <div className='slider__overlay' style={{ left: `${value+compensatorValue}%`, transform: `translateX(-50%)`}}>
                {/* {value} */}
                <div ref={emotionIconRef} className='slider__overlay-icon'></div>
                <svg viewBox="0 0 15 15" version="1.1" id="marker" xmlns="http://www.w3.org/2000/svg">
                    <path id="path4133" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703&#xA;&#x9;C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"/>
                </svg>
            
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

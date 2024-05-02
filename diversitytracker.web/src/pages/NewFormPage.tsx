import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
} from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import './NewFormPage.css'
import { GetAllQuestions, PostFormsData } from '../util/Http';
import { useMutation, useQuery } from 'react-query';
import { FormSubmitQuestionTypeDto, Gender, PostFormSubmissionDto, Question } from '../types/types';
import { CustomSlider } from '../components/CustomSlider';
import { AnonymousLogin } from '../shared_pages/AnonymousLogin';
import Lottie from 'lottie-web';
import { Player } from '@lottiefiles/react-lottie-player';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

type Props = {
    className: string,
    questionData: any, 
    isLoading: any, 
    isError: any, 
    error: any, 
    refetch: any
}

export const NewFormPage = ({className, questionData, isLoading, isError, error, refetch}: Props) => {
    const [playAnimations, setPlayAnimations] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [beginForm, setBeginForm] = useState(false);

    const onSubmitHandler = (values: any) => {
        const gender = parseInt(values.Select) as Gender;
        const age = values.age;
        const timeAtCompany = values.timeatcompany;
        const reflection = values.reflection;

        const questions: FormSubmitQuestionTypeDto[] = 
            questionData.map((question) => ({
                questionTypeId: question.id,
                value: values[question.id] / 10,
                answer: values["reflection_" + question.value] || ""
        }));

        const formSubmissionDto: PostFormSubmissionDto = {
            createdAt: new Date(),
            person: {
                name: `User_${age}`,
                gender: gender,
                age: age,
                timeAtCompany: timeAtCompany,
                personalReflection: reflection
            },
            questions: questions
        };

        postFormsData.mutate(formSubmissionDto);

        setPlayAnimations(true);
        setIsSubmitted(true);
    };

    const onFailSubmitHandler = (errorInfo: any) => {
        
    };

    const postFormsData = useMutation((postFormSubmissionDto: PostFormSubmissionDto) => PostFormsData(postFormSubmissionDto), {
        onSuccess: () => {
            refetch();
        }
    });

    return(
        <section className={className}>
            <div className={'anonymouslogin-container ' + (beginForm && 'inactive')} >
                <AnonymousLogin beginform={() => setBeginForm(true)}/>
            </div>
            <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="/cat.json"
                // style={{ height: '300px', width: '300px' }}
                className={'animation1 ' + (playAnimations && 'active')}
            />
            <Player
                autoplay={true}
                loop={true}
                controls={false} 
                src="/fireworks.json"
                // style={{ height: '300px', width: '300px' }}
                className={'animation2 ' + (playAnimations && 'active')}
            />

            <section className='newformpage-container__form-container'>
                {!isSubmitted ? 
                    <>
                    <h1>Salt Organization Form</h1>
                    <p className='animation3-container'>The more input the better
                    <Player
                        autoplay={true}
                        loop={true}
                        src="/writing.json"
                        // style={{ height: '300px', width: '300px' }}
                        className={'animation3'}
                    />
                    </p>
                    <Form 
                    {...formItemLayout}
                    style={{ maxWidth: 575 }}
                    variant="filled"  
                    onFinish={onSubmitHandler}
                    onFinishFailed={onFailSubmitHandler}
                    className='newformpage__form'
                    layout='vertical'

                    labelWrap
                    labelCol={{flex: '50px'}}
                >

                    <Form.Item className='newformpage__form__item' label="Gender" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
                        <Select
                            showSearch
                            placeholder="Select a your gender"
                            optionFilterProp="children"
                            options={[
                            {
                                value: '1',
                                label: 'Female',
                            },
                            {
                                value: '0',
                                label: 'Male',
                            },
                            {
                                value: '2',
                                label: 'Other',
                            },
                            ]}
                        />
                    </Form.Item>
                
                    <Form.Item
                        className='newformpage__form__item'
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input age.'}]}
                        >
                        <InputNumber min={18} max={105} style={{ width: '100%' }}/>
                        {/* <input type="number" /> */}
                    </Form.Item>

                    <Form.Item
                        className='newformpage__form__item'
                        label="Years At Company"
                        name="timeatcompany"
                        rules={[{ required: true, message: 'Please input time worked at company.'}]}
                        >
                        <InputNumber min={0} max={75} style={{ width: '100%' }}/>
                        {/* <input type="number" /> */}
                    </Form.Item>
                    
                
                    {isLoading && 'Loading...'}

                    {isError && 'Unknown Error occured...'}

                    {questionData && 
                        questionData.map((question) => (
                            <div className='newformpage__form__itemgroup'>
                                <Form.Item
                                    className='newformpage__form__item'
                                    // label={question.value}
                                    name={question.id}
                                    rules={[{ required: true, message: 'Please input your emotional level!' }]}
                                    >
                                    {/* <Slider min={0} max={100} defaultValue={50} /> */}
                                    <CustomSlider 
                                        min={0}
                                        max={100}
                                        step={.1}
                                        onChange={(value) => {}}
                                        text={question.value}
                                        key={question.id}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className='newformpage__form__item'
                                    // label={question.value + ""}
                                    name={"reflection_" + question.value}
                                    rules={[{ required: false}]}
                                    >
                                    <Input.TextArea />
                                </Form.Item>
                            </div>
                        ))
                    }
                    <Form.Item
                        className='newformpage__form__item'
                        label="Personal Reflections - We will weigh this heavily in our analysis"
                        name="reflection"
                        rules={[{ required: true, message: 'Please input!'}]}
                        >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item 
                        className='newformpage__form__item'
                        wrapperCol={{ offset: 6, span: 16 }}>
                        <Button className='newformpage__form__submitbtn' type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <footer className='newformpage-footer'>
                    <img src="https://res.cloudinary.com/dlw9fdrql/image/upload/v1714415047/office_tracker_logo_konca1.png" alt="" />
                    <h2>OFFICE TRACKER</h2>
                    <p>HARMONIZING THE INTEPERSONAL WORKSPACE</p>
                </footer>
                </>
                :
                <>
                    <section className='formsubmitted-container'>
                        <h2>Thank you for submitting your form!</h2>
                        <p>There are no other forms to be filled</p>
                    </section>
                </>
                }
               
            </section>
            
        </section>
    );

}
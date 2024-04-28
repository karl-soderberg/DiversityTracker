import React from 'react';
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

    const onSubmitHandler = (values: any) => {
        const gender = parseInt(values.Select) as Gender;
        const age = values.age;
        const timeAtCompany = values.timeatcompany;
        const reflection = values.reflection;

        // const questions: FormSubmitQuestionTypeDto[] = 
        // Object.keys(values)
        //     .filter(key => key.startsWith('QuestionType'))
        //     .map(key => ({
        //         questionTypeId: key,
        //         value: values[key] / 10,
        //         answer: values["reflection_" + question.value] || ""
        //     }));
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
            <h1>New Forms Page</h1>
            <p>Submit your form</p>

            <section className='newformpage-container__form'>
                <Form 
                    {...formItemLayout} 
                    variant="filled"  
                    onFinish={onSubmitHandler}
                    onFinishFailed={onFailSubmitHandler}
                >

                    <Form.Item label="Gender" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
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
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input age.', min: 0}]}
                        >
                        {/* <InputNumber style={{ width: '100%' }} /> */}
                        <input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Years At Company"
                        name="timeatcompany"
                        rules={[{ required: true, message: 'Please input time worked at company.', min: 0}]}
                        >
                        {/* <InputNumber style={{ width: '100%' }} /> */}
                        <input type="number" />
                    </Form.Item>
                    
                
                    {isLoading && 'Loading...'}

                    {isError && 'Unknown Error occured...'}

                    {questionData && 
                        questionData.map((question) => (
                            <>
                                <Form.Item
                                    // label={question.value}
                                    name={question.id}
                                    rules={[{ required: true, message: 'Please input your happiness level!' }]}
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
                                    label={question.value + " reflections"}
                                    name={"reflection_" + question.value}
                                    rules={[{ required: false}]}
                                    >
                                    <Input.TextArea />
                                </Form.Item>
                            </>
                        ))
                    }
                    <Form.Item
                        label="Personal Reflections - We will weigh this heavily in our analysis"
                        name="reflection"
                        rules={[{ required: true, message: 'Please input!'}]}
                        >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </section>
    );

}



// const { max, min } = props;
// const [value, setValue] = useState(0);

// const mid = Number(((max - min) / 2).toFixed(5));
// const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
// const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';



{/* <Form.Item
    label="TextArea"
    name="TextArea"
    rules={[{ required: true, message: 'Please input!' }]}
    >
    <Input.TextArea />
    </Form.Item> */}


    {/* <Form.Item
    label="DatePicker"
    name="DatePicker"
    rules={[{ required: true, message: 'Please input!' }]}
    >
    <DatePicker />
    </Form.Item>

    <Form.Item
    label="RangePicker"
    name="RangePicker"
    rules={[{ required: true, message: 'Please input!' }]}
    >
    <RangePicker />
    </Form.Item> */}
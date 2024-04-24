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
import { GetAllQuestions } from '../util/Http';
import { useQuery } from 'react-query';
import { Question } from '../types/types';

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
    className: string
}

export const NewFormPage = ({className}: Props) => {

    const { data, isLoading, isError, error, refetch } = useQuery<Array<Question>, Error>({
        queryKey: ['query'],
        queryFn: () => GetAllQuestions()
    });

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("fail!")
    };

    return(
        <section className={className}>
            <h1>New Forms Page</h1>
            <p>Submit your form</p>

            <section className='newformpage-container__form'>
                <Form 
                    {...formItemLayout} 
                    variant="filled"  
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item label="Gender" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
                    <Select
                        showSearch
                        placeholder="Select a your gender"
                        optionFilterProp="children"
                        options={[
                        {
                            value: 'female',
                            label: 'Female',
                        },
                        {
                            value: 'male',
                            label: 'Male',
                        },
                        {
                            value: 'other',
                            label: 'Other',
                        },
                        ]}
                    />
                    </Form.Item>
                
                    <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input!' }]}
                    >
                    <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                    label="Time At Company"
                    name="timeatcompany"
                    rules={[{ required: true, message: 'Please input!' }]}
                    >
                    <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    
                
                    {isLoading && 'Loading...'}

                    {isError && 'Unknown Error occured...'}

                    {data && 
                        data.map((question) => (
                            <Form.Item
                                label={question.value}
                                name={question.id}
                                rules={[{ required: true, message: 'Please input your happiness level!' }]}
                                >
                                <Slider min={0} max={100} defaultValue={50} tooltipVisible />
                            </Form.Item>
                        ))
                    }
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
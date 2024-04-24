// import React from 'react';
// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Slider,
// } from 'antd';
// import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
// import './NewFormPage.css'

// const { RangePicker } = DatePicker;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 14 },
//   },
// };

// type Props = {
//     className: string
// }

// export const NewFormPage = ({className}: Props) => {

//     // const { max, min } = props;
//     // const [value, setValue] = useState(0);

//     // const mid = Number(((max - min) / 2).toFixed(5));
//     // const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
//     // const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

//     const onSubmit = (value) => {
//         console.log('search:', value);
//       };

//     return(
//         <section className={className}>
//             <h1>New Forms Page</h1>
//             <p>Submit your form</p>

//             <section className='newformpage-container__form'>
//                 <Form {...formItemLayout} variant="filled"  onFinish={onSubmit}>

//                     <Form.Item label="Gender" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
//                     <Select
//                         showSearch
//                         placeholder="Select a your gender"
//                         optionFilterProp="children"
//                         options={[
//                         {
//                             value: 'female',
//                             label: 'Female',
//                         },
//                         {
//                             value: 'male',
//                             label: 'Male',
//                         },
//                         {
//                             value: 'other',
//                             label: 'Other',
//                         },
//                         ]}
//                     />
//                     </Form.Item>
                
//                     <Form.Item
//                     label="InputNumber"
//                     name="InputNumber"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <InputNumber style={{ width: '100%' }} />
//                     </Form.Item>
                
//                     <Form.Item
//                     label="TextArea"
//                     name="TextArea"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <Input.TextArea />
//                     </Form.Item>
                
//                     <Form.Item
//                     label="Mentions"
//                     name="Slider"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <div className="icon-wrapper">
//                         <FrownOutlined  />
//                             <Slider  />
//                         <SmileOutlined />
//                     </div>
//                     </Form.Item>

//                     <Form.Item
//                     label="Mentions"
//                     name="Slider"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <div className="icon-wrapper">
//                         <FrownOutlined  />
//                             <Slider  />
//                         <SmileOutlined />
//                     </div>
//                     </Form.Item>
                
                
//                     <Form.Item
//                     label="DatePicker"
//                     name="DatePicker"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <DatePicker />
//                     </Form.Item>
                
//                     <Form.Item
//                     label="RangePicker"
//                     name="RangePicker"
//                     rules={[{ required: true, message: 'Please input!' }]}
//                     >
//                     <RangePicker />
//                     </Form.Item>
                
//                     <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
//                     <Button type="primary" htmlType="submit" onSubmit = {onSubmit}>
//                         Submit
//                     </Button>
//                     </Form.Item>
//                 </Form>
//             </section>
//         </section>
//     );

// }


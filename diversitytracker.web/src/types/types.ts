export type DataResponseObject = {
    men: Array<BaseForm>,
    women: Array<BaseForm>,
}

export type BaseForm = {
    id: number,
    value: number,
}

export type Question = {
    id: string,
    value: string,
}

export type PostQuestionTypeDto = {
    value: string
}

export enum Gender {
    Man = 0,
    Woman = 1,
    Other = 2,
}

export type PostPersonDto = {
    name: string;
    gender: Gender;
    timeAtCompany: Date;
}

export type FormSubmitQuestionTypeDto = {
    questionTypeId?: string;
    value: number;
    answer: string;
}

export type PostFormSubmissionDto = {
    createdAt: Date;
    person: PostPersonDto;
    questions: FormSubmitQuestionTypeDto[];
}


export type PersonResponse = {
    id: string;
    name: string;
    gender: number;
    timeAtCompany: string;
    formSubmissions: (null | FormSubmissionResponse)[];
};
  
export type QuestionResponse = {
    id: string;
    questionTypeId: string;
    questionType: any;
    value: number;
    answer: string;
    formSubmissionId: string;
    formSubmission: any;
};
  
export type FormSubmissionResponse = {
    id: string;
    createdAt: string;
    personId: string;
    person: PersonResponse;
    questions: Array<QuestionResponse>;
};
  
export type APIFormsResponse = {
    requestedAt: string;
    formSubmissions: Array<FormSubmissionResponse>;
  };


export type FormSubmissionArray = {
    formSubmissions: Array<FormSubmissionResponse>
}

// Distribution data format
export type DistributionData = {
    questionId?: string
    data?: Array<DistributionDataType>
}

export type DistributionDataType = {
    value: number,
    numberofmen: number,
    numberofwomen: number
}


export type DistributionDataResponse = {
    [key: string]: DistributionData;
};

export type GenderValue = {
    name: string,
    value: number
}

export type GenderDistribution = {
    [key: string]: Array<GenderValue>
}

export type ChartGenderDistribution = {
    name: string,
    female: number,
    male: number
}

export type ChartDistributionDict = {
    [key: string]: Array<ChartGenderDistribution>
}

// { name: 'Male', value: malePercentage },
//     { name: 'Female', value: femalePercentage },
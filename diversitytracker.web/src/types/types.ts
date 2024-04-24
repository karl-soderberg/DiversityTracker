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
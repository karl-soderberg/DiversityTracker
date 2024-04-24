import { APIFormsResponse, DistributionDataResponse, Question} from "../types/types";

export const MapAPIFormsResponseToDistributionDataType = (inData: APIFormsResponse, questions: Array<Question>): DistributionDataResponse  => {

    const formSubmissions = inData.formSubmissions;
    let dataResponseDict: DistributionDataResponse = {};

    questions.forEach((question) => {
        dataResponseDict[question.id] = {
            questionId: question.id,
            data: [
                {
                    value: 1,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 2,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 3,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 4,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 5,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 6,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 7,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 8,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 9,
                    numberofmen: 0,
                    numberofwomen: 0
                },
                {
                    value: 10,
                    numberofmen: 0,
                    numberofwomen: 0
                },
            ]
        };
    });

    formSubmissions.forEach((formSubmissions) => {
        formSubmissions.questions.forEach((question) => {
            if(formSubmissions.person.gender == 0){
                for (let value = 1; value <= 10; value++) {
                    if (Math.round(question.value) == value) {
                        // console.log("question - " + question.questionTypeId + " has value for men: " + question.value);
                        dataResponseDict[question.questionTypeId].data[value-1].numberofmen++;
                    }
                }
            }
            else if(formSubmissions.person.gender == 1){
                for (let value = 1; value <= 10; value++) {
                    if (Math.round(question.value) == value) {
                        // console.log("question - " + question.questionTypeId + " has value for women: " + question.value);
                        dataResponseDict[question.questionTypeId].data[value-1].numberofwomen++;
                    }
                }
            }
        })
    })
    
    return dataResponseDict;
}
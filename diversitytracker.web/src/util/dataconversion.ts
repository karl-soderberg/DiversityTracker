import { APIFormsResponse, DistributionDataType} from "../types/types";

export const MapAPIFormsResponseToDistributionDataType = async (inData: APIFormsResponse): Promise<Array<DistributionDataType>> => {
    let resultObject: Array<DistributionDataType> = [
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


    const formSubmissions = inData.formSubmissions;
    const thresholds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    formSubmissions.forEach(formSubmission => {
        formSubmission.questions.forEach(question => {
            if(question.questionTypeId == 'QuestionType_01HW7GQ4XNRS7D01D9AAK8QBA8')
            {
                if(formSubmission.person.gender == 0 ){
                    for (let i = 0; i < thresholds.length; i++) {
                        if (question.value <= thresholds[i]) {
                            resultObject[i].numberofmen++;
                            break;
                        }
                    }
                }
                else if(formSubmission.person.gender == 1){
                    for (let i = 0; i < thresholds.length; i++) {
                        if (question.value <= thresholds[i]) {
                            resultObject[i].numberofwomen++;
                            break;
                        }
                    }
                }
            }
        });
        

        
    });

    return resultObject;

}
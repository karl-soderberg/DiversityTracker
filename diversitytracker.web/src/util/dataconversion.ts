import { APIFormsResponse, AiAnswerData, ChartDistributionDict, DistributionDataResponse, GenderDistribution, Question, scatterAiData, scatterAiDataArr, scatterAiDataDict, scatterData, scatterDataDict} from "../types/types";

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


export const MapAPIFormsResponseToGenderDistribution = (inData: APIFormsResponse, questions: Array<Question>): GenderDistribution  => {

    const formSubmissions = inData.formSubmissions;
    let dataResponseDict: GenderDistribution = {};

    questions.forEach((question) => {
        dataResponseDict[question.id] = [
            {
                name: 'Male',
                value: 0,
            },
            {
                name: 'Female',
                value: 0,
            }
        ]
    });

    formSubmissions.forEach((formsubmission) => {
        formsubmission.questions.forEach((question) => {
            if(formsubmission.person.gender == 0){
                dataResponseDict[question.questionTypeId][0].value++;
            }
            else if(formsubmission.person.gender == 1){
                dataResponseDict[question.questionTypeId][1].value++;
            }
        })
    }) 

    Object.keys(dataResponseDict).forEach((questionId) => {
        const totalResponses = dataResponseDict[questionId][0].value + dataResponseDict[questionId][1].value;
        if (totalResponses > 0) {
            dataResponseDict[questionId][0].value = (dataResponseDict[questionId][0].value / totalResponses) * 100;
            dataResponseDict[questionId][1].value = (dataResponseDict[questionId][1].value / totalResponses) * 100;
        }
    });

    return dataResponseDict;
}


export const MapAPIFormsResponseToBarChart = (inData: APIFormsResponse, questions: Array<Question>): ChartDistributionDict  => {

    const formSubmissions = inData.formSubmissions;
    let dataResponseDict: ChartDistributionDict = {};

    questions.forEach((question) => {
        dataResponseDict[question.id] = [
            {
                name: 'Disagree',
                female: 0,
                male: 0
            },
            {
                name: 'Somewhat disagree',
                female: 0,
                male: 0
            },
            {
                name: 'Indifferent',
                female: 0,
                male: 0
            },
            {
                name: 'Somewhat agree',
                female: 0,
                male: 0
            },
            {
                name: 'Strongly agree',
                female: 0,
                male: 0
            }
        ]
    });

    formSubmissions.forEach((formsubmission) => {
        formsubmission.questions.forEach((question) => {
            if(formsubmission.person.gender == 0){
                for(let value = 1; value <= 10; value++){
                    if (Math.round(question.value) == value) {
                        dataResponseDict[question.questionTypeId][Math.ceil(value / 2) - 1].male++;
                    }
                }
            }
            else if(formsubmission.person.gender == 1){
                for(let value = 1; value <= 10; value++){
                    if (Math.round(question.value) == value) {
                        dataResponseDict[question.questionTypeId][Math.ceil(value / 2) - 1].female++;
                    }
                }
            }
        })
    }) 

    return dataResponseDict;
}




export const MapAPIFormsResponseToScatterChart = (inData: APIFormsResponse, questions: Array<Question>): scatterDataDict  => {

    const formSubmissions = inData.formSubmissions;
    let dataResponseDict: scatterDataDict = {};

    questions.forEach((question) => {
        dataResponseDict[question.id] = {
            scatterMaleData: [],
            scatterFemaleData: []
        }
        
    });

    formSubmissions.forEach((formsubmission) => {
        formsubmission.questions.forEach((question) => {
            if(formsubmission.person.gender == 0){
                for(let value = 1; value <= 10; value++){
                    if (Math.round(question.value) == value) {
                        let scatterDataObject: scatterData = {
                            satisfactionlevel: question.value,
                            age: calculateAge(parseInt(formsubmission.person.timeAtCompany))
                        }
                        dataResponseDict[question.questionTypeId].scatterMaleData.push(scatterDataObject);
                    }
                }
            }
            else if(formsubmission.person.gender == 1){
                for(let value = 1; value <= 10; value++){
                    if (Math.round(question.value) == value) {
                        let scatterDataObject: scatterData = {
                            satisfactionlevel: question.value,
                            age: calculateAge(parseInt(formsubmission.person.timeAtCompany))
                        }
                        dataResponseDict[question.questionTypeId].scatterFemaleData.push(scatterDataObject);
                    }
                }
            }
        })
    }) 

    return dataResponseDict;
}

export const MapAPIFormsAIResponseToScatterChart = (inData: APIFormsResponse, questions: Array<Question>): scatterAiDataDict  => {
    const aiInterpretation = inData.aiInterpretation.questionInterpretations;
    let dataResponseDict: scatterAiDataDict = {};

    questions.forEach((question) => {
        dataResponseDict[question.id] = {
            scatterData: [],
        }

        aiInterpretation.forEach(interpretation => {
            if(interpretation.questionTypeId == question.id)
            {
                for (let idx = 0; idx < interpretation.aiAnswerData.value.length; idx++) {
                    dataResponseDict[question.id].scatterData.push({
                        wordlength: interpretation.aiAnswerData.wordLength[idx],
                        value: interpretation.aiAnswerData.value[idx]
                    })
                }
            }
        })
    });

    console.log(dataResponseDict);

    return dataResponseDict;
}


function calculateAge(yearOfBirth: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
  }


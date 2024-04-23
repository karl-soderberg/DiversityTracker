using AutoMapper;
using diversitytracker.api.Dtos;
using diversitytracker.api.Models;

namespace diversitytracker.api.Configurations
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<FormSubmission, PostFormSubmissionDto>().ReverseMap();
            CreateMap<FormSubmission, PostPersonDto>().ReverseMap();
            CreateMap<FormSubmission, PostQuestionDto>().ReverseMap();
            CreateMap<FormSubmission, UpdateFormSubmissionDto>().ReverseMap();
            CreateMap<QuestionType, UpdateQuestionTypeDto>().ReverseMap();
            CreateMap<QuestionType, PostQuestionTypeDto>().ReverseMap();
        }
    }
}
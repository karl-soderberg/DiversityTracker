using AutoMapper;
using diversitytracker.api.Models;

namespace diversitytracker.api.Configurations
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<FormSubmission, FormSubmissionResponseDto>().ReverseMap();
            CreateMap<FormSubmission, FormSubmissionPostDto>().ReverseMap();
        }
    }
}
using AutoMapper;
using diversitytracker.api.Models;
using diversitytracker.api.Models.Forms;

namespace diversitytracker.api.Configurations
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<FormSubmission, FormSubmissionResponseDto>().ReverseMap();
            CreateMap<BaseForm, BaseFormResponseDto>().ReverseMap();
        }
    }
}
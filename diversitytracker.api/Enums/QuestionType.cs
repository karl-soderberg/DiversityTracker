using System.Runtime.Serialization;

namespace diversitytracker.api.Enums
{
    public enum QuestionType
    {
        [EnumMember(Value = "leadership")]
        leadership,
        [EnumMember(Value = "represented")]
        represented,
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace diversitytracker.api.Models
{
    public class QuestionType
    {
        public int Id { get; set; }
        public required string Value { get; set; }
    }
}
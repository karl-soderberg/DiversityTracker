using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace diversitytracker.api.Models
{
    public class FormSubmission
    {
        public int Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required ICollection<Question> Questions { get; set; }
        public required Person Person { get; set; }
    }
}
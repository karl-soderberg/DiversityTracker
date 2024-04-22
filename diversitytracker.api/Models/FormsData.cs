using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace diversitytracker.api.Models
{
    public class FormsData
    {
        public required ICollection<FormSubmission> FormSubmissions { get; set; }
        public DateTime RequestedAt { get; set; }
    }
}
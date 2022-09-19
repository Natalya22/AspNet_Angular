using License.Utils;
using System;

namespace License.Models
{
    public class License
    {
        public int Id { get; set; }
        public string Organization { get; set; }
        public string SerialNumber { get; set; }
        public DateTime IssueDate { get; set; } // дата выдачи
        public int Validity { get; set; } // срок действия
        public Period period { get; set; } // период
        public string DigitalSignature { get; set; } // цифровая подпись
    }
}

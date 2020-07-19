using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class Priorities
    {
        public int Id { get; set; }
        public int ToDoId { get; set; }
        public string Type { get; set; }
        public string PriorityDate { get; set; }
    }
}

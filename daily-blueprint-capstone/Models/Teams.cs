using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class Teams
    {
        public int TeamId { get; set; }
        public bool isTeamLead { get; set; }
        public bool isPrimary { get; set; }
        public string TeamName { get; set; }
    }
}

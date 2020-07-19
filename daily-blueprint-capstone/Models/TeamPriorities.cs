using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class TeamPriorities
    {
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public bool isTeamLead { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string FirebaseUid { get; set; }
        public int OrganizationId { get; set; }
        public List<PriorityDetails> memberPriorities { get; set; }
    }
}

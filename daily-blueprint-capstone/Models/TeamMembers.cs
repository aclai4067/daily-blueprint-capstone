﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class TeamMembers
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TeamId { get; set; }
        public bool isTeamLead { get; set; }
        public bool isPrimary { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class ToDos
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string DateCreated { get; set; }
        public string DateDue { get; set; }
        public int OwnerUserId { get; set; }
        public bool isComplete { get; set; }
        public string Link { get; set; }
        public List<TaggedUsers> TaggedUsers { get; set; }

    }
}

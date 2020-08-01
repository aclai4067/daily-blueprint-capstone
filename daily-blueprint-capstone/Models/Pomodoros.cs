using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.Models
{
    public class Pomodoros
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int workMinutes { get; set; }
        public int shortBreakMinutes { get; set; }
        public int longBreakMinutes { get; set; }
        public int sessionsUntilLongBreak { get; set; }
        public int totalSessions { get; set; }
    }
}

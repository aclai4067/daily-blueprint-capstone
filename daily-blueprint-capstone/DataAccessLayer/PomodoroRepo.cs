using daily_blueprint_capstone.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace daily_blueprint_capstone.DataAccessLayer
{
    public class PomodoroRepo
    {
        string ConnectionString;
        public PomodoroRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("DailyBlueprint");
        }

        public Pomodoros GetPomodoroSettings(int userId)
        {
            var query = @"select * from Pomodoro
                        where UserId = @UserId";

            using( var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                return db.QueryFirstOrDefault<Pomodoros>(query, parameters);
            }
        }

        public Pomodoros AddPomodoroSettings(Pomodoros newPomodoro)
        {
            var query = @"insert into Pomodoro(UserId, WorkMinutes, ShortBreakMinutes, LongBreakMinutes, SessionsUntilLongBreak, TotalSessions)
                        output inserted.*
                        values(@UserId, @WorkMinutes, @ShortBreakMinutes, @LongBreakMinutes, @SessionsUntilLongBreak, @TotalSessions)";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Pomodoros>(query, newPomodoro);
            }
        }

        public Pomodoros UpdatePomodoroSettings(Pomodoros updatedPomodoro)
        {
            var query = @"update Pomodoro
                            set WorkMinutes = @WorkMinutes
                            , ShortBreakMinutes = @ShortBreakMinutes
                            , LongBreakMinutes = @LongBreakMinutes
                            , SessionsUntilLongBreak = @SessionsUntilLongBreak
                            , TotalSessions = @TotalSessions
                        output inserted.*
                        where Id = @Id";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Pomodoros>(query, updatedPomodoro);
            }
        }
    }
}

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
    public class TeamsRepo
    {
        string ConnectionString;
        public TeamsRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("DailyBlueprint");
        }

        public IEnumerable<Teams> GetTeamsByUser(int userId)
        {
            var query = @"select *
                        from TeamMembers TM
	                        join Teams T
	                        on TM.teamId = T.id
                        where TM.userId = @UserId";

            using(var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                return db.Query<Teams>(query, parameters);
            }
        }

        public Teams RemovePrimaryTeam(TeamMembersBasic teamObj)
        {
            var query = @"update TeamMembers
                            set isPrimary = 0
                        output inserted.*
                        where userId = @userId
                        and isPrimary = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Teams>(query, teamObj);
            }
        }

        public Teams AddPrimaryTeam(TeamMembersBasic teamObj)
        {
            var query = @"update TeamMembers
                            set isPrimary = 1
                        output inserted.*
                        where userId = @UserId
                        and teamId = @TeamId";

            using(var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Teams>(query, teamObj);
            }
        }
    }
}

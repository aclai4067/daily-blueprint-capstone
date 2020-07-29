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
                        where TM.userId = @UserId
                        order by TeamName";

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

        public TeamMembers FindPrimaryTeam(int userId)
        {
            var query = @"select * from TeamMembers
                        where userId = @userId
                        and isPrimary = 1";
            
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                return db.QueryFirstOrDefault<TeamMembers>(query, parameters);
            }
        }

        public TeamMembers AddTeamMember(TeamMembers newTeamMember)
        {
            var hasPrimary = FindPrimaryTeam(newTeamMember.UserId);
            if (hasPrimary == null) newTeamMember.isPrimary = true;

            var query = @"insert into TeamMembers(userId, teamId, isTeamLead, isPrimary)
                        output inserted.*
                        values(@userId, @teamId, @isTeamLead, @isPrimary)";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<TeamMembers>(query, newTeamMember);
            }
        }

        public int RemoveTeamMember(TeamMembersBasic memberToDelete)
        {
            var deleteQuery = @"delete from TeamMembers
                        where userId = @UserId
                        and teamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var removed = db.Execute(deleteQuery, memberToDelete);
                return removed;
            }
        }


    }
}

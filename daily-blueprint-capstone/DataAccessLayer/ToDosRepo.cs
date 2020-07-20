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
    public class ToDosRepo
    {
        string ConnectionString;
        public ToDosRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("DailyBlueprint");
        }

        public List<Users> GetTaggedUsersByToDoId(int toDoId)
        {
            var query = @"select users.*
                        from Users
	                        join Tags
	                        on Tags.UserId = Users.Id
                        where Tags.ToDoId = @ToDoId";

            using(var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { ToDoId = toDoId };
                var taggedUsers = db.Query<Users>(query, parameters);
                return taggedUsers.ToList();
            }
        }

        public IEnumerable<PriorityDetails> GetPrioritiesByUser(int userId)
        {
            var query = @"select p.id as priorityId, p.*, t.*
                        from priorities p
                            join toDos t
                            on p.toDoId = t.id
                        where t.ownerUserId = @UserId
                        and t.isComplete = 0";

            using(var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                var userPriorities = db.Query<PriorityDetails>(query, parameters).ToList();
                foreach (var p in userPriorities)
                {
                    var tagged = GetTaggedUsersByToDoId(p.ToDoId);
                    p.TaggedUsers = tagged;
                }
                return userPriorities;
            }
        }

        public List<ToDos> GetToDosByUser(int userId)
        {
            var query = @"select *
                        from toDos 
                        where ownerUserId = @UserId
                        and isComplete = 0";

            var priorities = GetPrioritiesByUser(userId).ToList();

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                var allToDos = db.Query<ToDos>(query, parameters);
                var toDos = new List<ToDos>();
                foreach (var t in allToDos)
                {
                    var checkForPriority = priorities.FirstOrDefault((p) => p.ToDoId == t.Id);
                    if (checkForPriority == null)
                    {
                        toDos.Add(t);
                    }
                }
                return toDos;
            }
        }

        public IEnumerable<TaggedToDos> GetTagsByUser(int userId)
        {
            var query = @"select (u.firstName + ' ' + u.lastName) as OwnerName, tg.id as TagId, tg.*, td.*  
                        from tags tg
                            join toDos td
                            on tg.toDoId = td.id
                            join users u
                            on td.ownerUserId = u.id
                        where tg.userId = @userId
                        and td.isComplete = 0";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };
                return db.Query<TaggedToDos>(query, parameters);
            }
        }

        public ToDos SaveToDo(ToDos toDoToAdd)
        {
            var query = @"insert into ToDos(Description, DateCreated, DateDue, OwnerUserId, isComplete, Link)
                        output inserted.*
                        values(@Description, @DateCreated, @DateDue, @OwnerUserId, @isComplete, @Link)";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<ToDos>(query, toDoToAdd);
            }
        }

        public Priorities SavePriority(Priorities priorityToAdd)
        {
            var query = @"insert into Priorities(ToDoId, Type, PriorityDate)
                        output inserted.*
                        values(@ToDoId, @Type, @PriorityDate)";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Priorities>(query, priorityToAdd);
            }
        }

        public List<TeamPriorities> GetPrioritiesByTeamId(int teamId)
        {
            var query = @"select *
                        from TeamMembers TM
	                        join Users U
	                        on TM.UserId = U.Id
                        where TM.TeamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { TeamId = teamId };
                var getTeam = db.Query<TeamPriorities>(query, parameters).ToList();
                foreach (var user in getTeam)
                {
                    var priorities = GetPrioritiesByUser(user.UserId).ToList();
                    user.memberPriorities = priorities;
                }
                return getTeam;
            }
        }
    }
}

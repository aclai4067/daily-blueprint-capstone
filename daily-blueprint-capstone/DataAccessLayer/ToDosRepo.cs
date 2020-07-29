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

        public List<TaggedUsers> GetTaggedUsersByToDoId(int toDoId)
        {
            var query = @"select users.*, Tags.Id as TagId
                        from Users
	                        join Tags
	                        on Tags.UserId = Users.Id
                        where Tags.ToDoId = @ToDoId";

            using(var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { ToDoId = toDoId };
                var taggedUsers = db.Query<TaggedUsers>(query, parameters);
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
                        and t.isComplete = 0
                        order by PriorityDate";

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
                        and isComplete = 0
                        order by DateDue";

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
                        var tagged = GetTaggedUsersByToDoId(t.Id);
                        t.TaggedUsers = tagged;
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
                        and td.isComplete = 0
                        order by DateDue";

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
                        where TM.TeamId = @TeamId
                        order by FirstName";

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

        public ToDos UpdateToDo(ToDos toDoToUpdate)
        {
            var query = @"Update ToDos
                            set description = @description
                            , dateDue = @dateDue
                            , link = @link
                            , isComplete = @isComplete
                        output inserted.*
                        where id = @Id";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<ToDos>(query, toDoToUpdate);
            }
        }

        public Priorities ChangePriorityType(int priorityId, string newPriorityType)
        {
            var query = @"Update Priorities
                            set type = @Type
                        output inserted.*
                        where id = @Id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Type = newPriorityType, Id = priorityId };
                return db.QueryFirstOrDefault<Priorities>(query, parameters);
            }
        }

        public int DeletePriority(int priorityId)
        {
            var query = @"Delete from Priorities
                            where id = @Id";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { Id = priorityId };
                return db.Execute(query, parameters);
            }
        }

        public ToDos MarkToDoComplete(int toDoId)
        {
            var query = @"Update ToDos
                            set isComplete = 1
                        output inserted.*
                        where id = @ToDoId";

            using( var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { ToDoId = toDoId };
                return db.QueryFirstOrDefault<ToDos>(query, parameters);
            }
        }

        public Tags AddTag(Tags tagToAdd)
        {
            var query = @"insert into Tags(ToDoId, UserId)
                        output inserted.*
                        values(@ToDoId, @UserId)";

            using ( var db = new SqlConnection(ConnectionString))
            {
                return db.QueryFirstOrDefault<Tags>(query, tagToAdd);
            }
        }

        public int DeleteTag(int tagId)
        {
            var query = @"delete from Tags
                        where Id = @TagId";
            
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { TagId = tagId };
                return db.Execute(query, parameters);
            }
        }
    }
}

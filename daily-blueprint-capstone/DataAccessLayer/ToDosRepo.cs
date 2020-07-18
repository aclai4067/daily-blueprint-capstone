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
                return db.Query<PriorityDetails>(query, parameters);
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
    }
}

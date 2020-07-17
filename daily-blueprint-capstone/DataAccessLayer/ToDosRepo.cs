using daily_blueprint_capstone.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
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
            var query = @"select * from priorities p
                            join toDos t
                            on p.toDoId = t.id
                        where t.ownerUserId = @UserId
                        and t.isComplete = 0";


        }
    }
}

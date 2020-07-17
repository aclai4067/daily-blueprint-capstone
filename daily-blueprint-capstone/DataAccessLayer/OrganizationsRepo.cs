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
    public class OrganizationsRepo
    {
        string ConnectionString;
        public OrganizationsRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("DailyBlueprint");
        }

        public IEnumerable<Organizations> GetAllOrgs()
        {
            var query = "select * from organizations";

            using(var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Organizations>(query);
            }
        }
    }
}

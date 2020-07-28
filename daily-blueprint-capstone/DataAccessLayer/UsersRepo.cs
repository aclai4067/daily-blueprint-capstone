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
    public class UsersRepo
    {
        string ConnectionString;
        public UsersRepo(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("DailyBlueprint");
        }

        public Users GetUserByFirebaseUID(string uid)
        {
            var query = @"select *
                        from Users
                        where FirebaseUID = @UID";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UID = uid };
                return db.QueryFirstOrDefault<Users>(query, parameters);
            }
        }

        public IEnumerable<Users> SaveNewUser(Users UserToAdd)
        {
            var query = @"insert into Users(FirstName, LastName, Title, ImageUrl, FirebaseUid, OrganizationId)
                        output inserted.*
                        values(@FirstName, @LastName, @Title, @ImageUrl, @FirebaseUid, @OrganizationId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Users>(query, UserToAdd);
            }
        }

        public IEnumerable<Users> GetUsersByOrgId(int orgId)
        {
            var query = @"select * from Users
                        where organizationId = @OrgId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { OrgId = orgId };
                return db.Query<Users>(query, parameters);
            }
        }
    }
}

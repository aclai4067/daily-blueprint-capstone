using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
using daily_blueprint_capstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace daily_blueprint_capstone.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepo _repository;

        public UsersController(UsersRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("firebase/{uid}")]
        public IActionResult GetUserByFirebaseUID(string uid)
        {
            var user = _repository.GetUserByFirebaseUID(uid);
            if (user == null) return NotFound("User does not exist");
            return Ok(user);
        }

        [HttpPost("newUser")]
        public IActionResult CreateNewUser(Users UserToAdd)
        {
            var existingUser = _repository.GetUserByFirebaseUID(UserToAdd.FirebaseUid);
            if (existingUser != null) return Ok(existingUser);

            var newUser = _repository.SaveNewUser(UserToAdd);
            return Ok(newUser);
        }

        [HttpGet("organization/{orgId}")]
        public IActionResult GetAllUsersByOrg(int orgId)
        {
            var orgUsers = _repository.GetUsersByOrgId(orgId);
            var isEmpty = !orgUsers.Any();
            if (isEmpty) return NotFound("No users have signed up for this organization");
            return Ok(orgUsers);
        }
    }
}

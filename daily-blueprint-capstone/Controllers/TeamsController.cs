using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
using daily_blueprint_capstone.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace daily_blueprint_capstone.Controllers
{
    [Route("api/teams")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        TeamsRepo _repository;

        public TeamsController(TeamsRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetTeamsByUserId(int userId)
        {
            var userTeams = _repository.GetTeamsByUser(userId);
            var isEmpty = !userTeams.Any();
            if (isEmpty)
            {
                return NotFound("You have not been assigned to any teams.  Please contact your team lead.");
            }
            return Ok(userTeams);
        }

        [HttpPut("primary")]
        public IActionResult UpdatePrimaryTeam(TeamMembersBasic teamObj)
        {
            var oldPrimary = _repository.RemovePrimaryTeam(teamObj);
            if (oldPrimary == null) return NotFound("Primary team update could not be completed");
            var newPrimary = _repository.AddPrimaryTeam(teamObj);
            if (newPrimary == null) return NotFound("This team could not be found");
            return Ok(newPrimary);
        }
    }
}
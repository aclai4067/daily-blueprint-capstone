using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
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
    }
}
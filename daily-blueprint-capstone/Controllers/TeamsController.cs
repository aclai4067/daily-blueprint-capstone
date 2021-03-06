﻿using System;
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

        [HttpPost("TeamMember")]
        public IActionResult CreateTeamMember(TeamMembers teamMemberObj)
        {
            var newTeammate = _repository.AddTeamMember(teamMemberObj);
            if (newTeammate == null) return NotFound("This team member could not be added.");
            return Ok(newTeammate);
        }

        [HttpDelete("TeamMember/delete")]
        public IActionResult DeleteTeamMember(TeamMembersBasic teamMemberToRemove)
        {
            var removeTeamMember = _repository.RemoveTeamMember(teamMemberToRemove);
            if (removeTeamMember == 0) NotFound("This team member could not be removed.");
            var otherTeams = _repository.GetTeamsByUser(teamMemberToRemove.UserId);
            if (otherTeams.Any())
            {
                var hasPrimary = otherTeams.FirstOrDefault((t) => t.isPrimary);
                if (hasPrimary == null)
                {
                    var newPrimary = otherTeams.First();
                    var newPrimaryBasic = new TeamMembersBasic();
                    newPrimaryBasic.UserId = teamMemberToRemove.UserId;
                    newPrimaryBasic.TeamId = newPrimary.TeamId;
                    var changePrimary = _repository.AddPrimaryTeam(newPrimaryBasic);
                    if (changePrimary == null) return NotFound("This team member was removed, but a new primary team could not be assigned.");
                    return Ok(changePrimary);
                }
            }
            return Ok("This team member has been removed");
        }
    }
}
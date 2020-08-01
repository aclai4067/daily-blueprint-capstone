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
    [Route("api/pomodoro")]
    [ApiController]
    public class PomodoroController : ControllerBase
    {
        PomodoroRepo _repository;

        public PomodoroController(PomodoroRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("{userId}")]
        public IActionResult GetPomodoroSettings(int userId)
        {
            var settings = _repository.GetPomodoroSettings(userId);
            if (settings == null) return NotFound("This user does not have custom settings");
            return Ok(settings);
        }

        [HttpPost("create")]
        public IActionResult CreatePomodoroSettings(Pomodoros newPomodoro)
        {
            var existingSettings = _repository.GetPomodoroSettings(newPomodoro.UserId);
            if (existingSettings == null)
            {
                var newSettings = _repository.AddPomodoroSettings(newPomodoro);
                if (newSettings == null) return NotFound("These settings could not be saved");
                return Ok(newSettings);
            }
            return BadRequest("This user already has customer pomodoro timer settings");
        }

        [HttpPut("edit")]
        public IActionResult EditPomodoroSettings(Pomodoros updatedPomodoro)
        {
            var existingSettings = _repository.GetPomodoroSettings(updatedPomodoro.UserId);
            if (existingSettings == null)
            {
                return BadRequest("Existing pomodoro settings could not be found");
            }
            var updatedSettings = _repository.UpdatePomodoroSettings(updatedPomodoro);
            if (updatedSettings == null) return NotFound("These updated settings could not be saved");
            return Ok(updatedSettings);
            
        }
    }
}
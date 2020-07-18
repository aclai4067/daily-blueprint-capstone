using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace daily_blueprint_capstone.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class ToDosController : ControllerBase
    {
        ToDosRepo _repository;

        public ToDosController(ToDosRepo repository)
        {
            _repository = repository;
        }

        [HttpGet("priorities/user/{userId}")]
        public IActionResult GetUserPriorities(int userId)
        {
            var priorities = _repository.GetPrioritiesByUser(userId);
            var isEmpty = !priorities.Any();
            if (isEmpty)
            {
                return NotFound("There are no open priorities for this user");
            }
            return Ok(priorities);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUserToDos(int userId)
        {
            var toDos = _repository.GetToDosByUser(userId);
            var isEmpty = !toDos.Any();
            if (isEmpty)
            {
                return NotFound("There are no open to-do items for this user");
            }
            return Ok(toDos);
        }
    }
}
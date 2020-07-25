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

        [HttpGet("tagged/user/{userId}")]
        public IActionResult GetUserTags(int userId)
        {
            var tags = _repository.GetTagsByUser(userId);
            var isEmpty = !tags.Any();
            if (isEmpty)
            {
                return NotFound("You have not been tagged in any open to do items");
            }
            return Ok(tags);
        }

        [HttpPost("new")]
        public IActionResult CreateToDo(ToDos toDo)
        {
            var newToDo = _repository.SaveToDo(toDo);
            if (newToDo == null)
            {
                return NotFound("There was a problem saving your to-do item");
            }
            return Ok(newToDo);
        }

        [HttpPost("new/priority")]
        public IActionResult CreatePriority(Priorities priority)
        {
            var newPriority = _repository.SavePriority(priority);
            if (newPriority == null)
            {
                return NotFound("There was a problem saving your to-do item");
            }
            return Ok(newPriority);
        }

        [HttpGet("team/{teamId}")]
        public IActionResult GetPrioritiesByTeam(int teamId)
        {
            var teamPriorities = _repository.GetPrioritiesByTeamId(teamId);
            var isEmpty = !teamPriorities.Any();
            if (isEmpty)
            {
                return NotFound("Looks like no one has been assigned to this team yet");
            }
            return Ok(teamPriorities);
        }

        [HttpPut("update")]
        public IActionResult UpdatePriority(ToDos toDoToUpdate)
        {
            var updatedToDo = _repository.UpdateToDo(toDoToUpdate);
            return Ok(updatedToDo);
        }

        [HttpPut("update/priority")]
        public IActionResult UpdatePriority(PriorityDetails priorityToUpdate)
        {
            if (priorityToUpdate.Type == "daily" || priorityToUpdate.Type == "weekly")
            {
                _repository.ChangePriorityType(priorityToUpdate.PriorityId, priorityToUpdate.Type);
            }
            else
            {
                _repository.DeletePriority(priorityToUpdate.PriorityId);
            }
            var ToDoToUpdate = new ToDos();
            ToDoToUpdate.Id = priorityToUpdate.ToDoId;
            ToDoToUpdate.Description = priorityToUpdate.Description;
            ToDoToUpdate.DateDue = priorityToUpdate.DateDue;
            ToDoToUpdate.Link = priorityToUpdate.Link;
            ToDoToUpdate.isComplete = priorityToUpdate.isComplete;
            var updatedToDo = _repository.UpdateToDo(ToDoToUpdate);
            return Ok(updatedToDo);
        }

        [HttpPut("complete/{toDoId}")]
        public IActionResult CompleteToDo(int toDoId)
        {
            var completedToDo = _repository.MarkToDoComplete(toDoId);
            if (completedToDo == null) return NotFound("this item could not be updated");
            return Ok(completedToDo);
        }
    }
}
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
    }
}
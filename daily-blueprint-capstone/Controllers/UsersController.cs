using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace daily_blueprint_capstone.Controllers
{
    [Route("api/employees")]
    [ApiController]

    public class EmployeesController : ControllerBase
    {
        EmployeesRepo _repository;

        public EmployeesController(EmployeesRepo repository)
        {
            _repository= repository;
        }
    }
}

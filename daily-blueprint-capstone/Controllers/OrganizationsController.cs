using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using daily_blueprint_capstone.DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace daily_blueprint_capstone.Controllers
{
    [Route("api/organizations")]
    [ApiController]

    public class OrganizationsController : ControllerBase
    {
        OrganizationsRepo _repository;

        public OrganizationsController(OrganizationsRepo repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllOrgs()
        {
            var allOrgs = _repository.GetAllOrgs();
            var isEmpty = !allOrgs.Any();
            if (isEmpty)
            {
                return NotFound("There was an error retreiving the organization list");
            }
            return Ok(allOrgs);
        }
    }
}
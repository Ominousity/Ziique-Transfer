using Application.Interfaces;
using Domain.Management;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagementController : ControllerBase
    {
        private readonly IManagementService _managementService;

        public ManagementController(IManagementService managementService)
        {
            _managementService = managementService;
        }

        [Authorize]
        [HttpGet("{userID}")]
        public ActionResult<List<ManagementFile>> GetFilesFromUser(Guid userID)
        {

            var files = _managementService.GetFilesFromUser(userID);
            if (files is null)
            {
                return NotFound();
            }
            return Ok(files);
        }

        [Authorize]
        [HttpPost]
        public ActionResult SaveFileToUser([FromBody] ManagementFile file)
        {
            _managementService.SaveFileToUser(file);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{fileID}")]
        public ActionResult DeleteFile(Guid fileID)
        {
            _managementService.DeleteFile(fileID);
            return Ok();
        }
    }
}

using Application.Interfaces;
using Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userRepo;

        public UserController(IUserService userRepo)
        {
            _userRepo = userRepo;
        }

        [Authorize]
        [HttpGet("GetUser/{username}")]
        public ActionResult<User> GetUser(string username)
        {
            var user = _userRepo.GetUserByUsername(username);
            return Ok(user);
        }

        [HttpPost("Register")]
        public ActionResult RegisterUser([FromBody] User user)
        {
            _userRepo.Register(user.Username, user.Password);
            return Ok();
        }

        [HttpPost("Login")]
        public ActionResult<string> LoginUser([FromBody] User user)
        {
            
            try
            {
                string token =_userRepo.Login(user.Username, user.Password);
                return Ok(token);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
        }
    }
}

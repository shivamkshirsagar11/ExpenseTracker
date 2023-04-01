using ExpenseTracker.Auth;
using ExpenseTracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _authRepo;

        public AuthController(IAuth authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<int>> Register(UserRegDTO userDTO)
        {
            var res = await _authRepo.Register(new User() { Name = userDTO.Name, Email = userDTO.Email}, userDTO.Password);
            if (res == 0)
            {
                return BadRequest($"cannot register {userDTO.Name}");
            }
            return Ok(res);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<int>> Login(UserLoginDTO userDTO)
        {
            var res = await _authRepo.Login(userDTO.Email, userDTO.Password);
            if (res == null)
            {
                return BadRequest($"Incorrect Email or Password1");
            }
            return Ok(res);
        }
    }
}

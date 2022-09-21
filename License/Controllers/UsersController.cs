using License.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace License.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UsersController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (login is null)
            {
                return BadRequest("Invalid client request");
            }
            var existingUser = _context.Users
                .FirstOrDefault(x => x.UserName == login.UserName
                                  && x.Password == login.Password);
            if (existingUser != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: new Claim[]{ new Claim("UserId", existingUser.Id.ToString()) },
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new AuthenticatedResponse { Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] User user)
        {
            if (user is null)
                return BadRequest("Invalid client request");
            else
            {
                if (_context.Users.FirstOrDefault(x => x.UserName == user.UserName) != null)
                    return BadRequest("Such user already exists");
                else
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                }
            }
            return Ok();
        }
    }
}

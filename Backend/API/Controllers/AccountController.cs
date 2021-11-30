using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Infrastructure;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<Token>> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (result.Succeeded)
                return Ok(new Token{ AccessToken = _tokenService.CreateToken(user, roles[0]) });

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
                return BadRequest("Email is already in use");
            if (await _dbContext.Restaurants.AnyAsync(x => x.Name == registerDTO.RestaurantName))
                return BadRequest("Restaurant name is already in use");

            var restaurant = new Restaurant
            {
                Name = registerDTO.RestaurantName
            };
            _dbContext.Restaurants.Add(restaurant);
            await _dbContext.SaveChangesAsync();

            var user = new AppUser
            {
                Email = registerDTO.Email,
                RestaurantId = restaurant.Id,
                UserName = registerDTO.Email.Split("@")[0]
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
                return Ok(new Token{ AccessToken = _tokenService.CreateToken(user, "Admin") });
            }

            _dbContext.Restaurants.Remove(restaurant);
            await _dbContext.SaveChangesAsync();

            return BadRequest("Something went wrong");
        }

        [HttpGet("userRoles")]
        public async Task<ActionResult<IList<string>>> GetUserRoles()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (user != null) {
                return Ok(await _userManager.GetRolesAsync(user));
            }

            return BadRequest("User not found");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("roles")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            var roleList = new List<string>();

            foreach (var role in roles)
                roleList.Add(role.Name);

            return roleList;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("addEmployee")]
        public async Task<ActionResult> AddEmployee([FromBody] EmployeeDTO employeeDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == employeeDTO.Email))
                return BadRequest("Email is already in use");

            var user = new AppUser
            {
                Email = employeeDTO.Email,
                RestaurantId = int.Parse(((ClaimsIdentity)HttpContext.User.Identity).FindFirst("Restaurant").Value),
                UserName = employeeDTO.Email.Split("@")[0]
            };
            var result = await _userManager.CreateAsync(user, employeeDTO.Password);
            if (result.Succeeded)
            {
                result = await _userManager.AddToRoleAsync(user, employeeDTO.Role);
                if (result.Succeeded)
                    return Ok();
                
                return BadRequest("Invalid role name");
            }

            return BadRequest("Something went wrong");
        }
    }
}
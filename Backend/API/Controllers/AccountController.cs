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
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _dbContext;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<ActionResult<Token>> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
                return Unauthorized();
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (result.Succeeded)
                return Ok(new Token{ AccessToken = _tokenService.CreateToken(user) });

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
                return Ok(new Token{ AccessToken = _tokenService.CreateToken(user) });
            }

            _dbContext.Restaurants.Remove(restaurant);
            await _dbContext.SaveChangesAsync();

            return BadRequest("Something went wrong");
        }
    }
}
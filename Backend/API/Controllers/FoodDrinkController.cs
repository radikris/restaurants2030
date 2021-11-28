using System;
using System.Collections.Generic;
using System.Linq;
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
    public class FoodDrinkController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;


        public FoodDrinkController(ApplicationDbContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<DTO.FoodDrinkDTO>>> GetFoodDrinks()
        {

            var RestaurantId = int.Parse(((ClaimsIdentity)HttpContext.User.Identity).FindFirst("Restaurant").Value);

            var list = await _dbContext.FoodsDrinks.Where(x => x.RestaurantId == RestaurantId).ToListAsync();

            var foodDrinkDTOList = new List<FoodDrinkDTO>();
            foreach (var item in list)
            {
                foodDrinkDTOList.Add(new FoodDrinkDTO(item));
            }

            return (foodDrinkDTOList).ToList();

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var foodDrink = await _dbContext.FoodsDrinks.SingleOrDefaultAsync(p => p.Id == id);

            if (foodDrink == null)
                return NotFound();

            _dbContext.FoodsDrinks.Remove(foodDrink);
            await _dbContext.SaveChangesAsync();

            return NoContent(); // a sikeres torlest 204 NoContent valasszal jelezzuk (lehetne meg 200 OK is, ha beletennenk an entitast)
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Modify([FromRoute] int id, [FromBody] FoodDrinkDTO updated)
        {
            var foodDrink = await _dbContext.FoodsDrinks.SingleOrDefaultAsync(p => p.Id == id);

            if (foodDrink == null)
                return NotFound();

            // modositasok elvegzese
            foodDrink.Name = updated.Name;
            foodDrink.Price = updated.Price;

            // mentes az adatbazisban
            await _dbContext.SaveChangesAsync();

            return NoContent(); // 204 NoContent valasz
        }

    }
}
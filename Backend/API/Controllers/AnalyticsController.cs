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
    public class AnalyticsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;


        public AnalyticsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("weekly")]

        public async Task<ActionResult<List<DTO.AnalyticsDTO>>> GetWeeklyIncome()
        {

            var RestaurantId = int.Parse(((ClaimsIdentity)HttpContext.User.Identity).FindFirst("Restaurant").Value);


            DateTime startDate = DateTime.Now.AddDays(-7);
            DateTime now = DateTime.Now;
            var list = await _dbContext.PaidOrders
            .Where(x => x.RestaurantId == RestaurantId)
            .Include(x => x.FoodDrink)
            .Where(x => x.Date >= startDate && x.Date <= now)
            .ToListAsync();



            var resultList = new List<AnalyticsDTO>();
            for (int i = 0; i < 7; i++)
            {
                resultList.Add(new AnalyticsDTO { DataName = "", DataValue = 0 });

            }
            foreach (var item in list)
            {
                Console.WriteLine(item);
                //int idx = Math.Max((((int)item.Date.DayOfWeek) - ((int)startDate.Date.DayOfWeek)));
                int idx = (((int)item.Date.DayOfWeek));
                Console.WriteLine(idx);
                Console.WriteLine(resultList[idx].DataName);
                Console.WriteLine(resultList[idx].DataValue);

                resultList[idx].DataName = item.Date.DayOfWeek.ToString();
                resultList[idx].DataValue = resultList[idx].DataValue + item.FoodDrink.Price;

            }

            return (resultList).ToList();

        }

        [HttpGet]
        [Route("popular")]

        public async Task<ActionResult<List<DTO.AnalyticsDTO>>> GetMostPopularFoodDrinks()
        {

            var RestaurantId = int.Parse(((ClaimsIdentity)HttpContext.User.Identity).FindFirst("Restaurant").Value);

            var list = await _dbContext.PaidOrders
             .Include(x => x.FoodDrink)
             .Where(y => y.RestaurantId == RestaurantId)
             .GroupBy(x => x.FoodDrinkId)
             .Select(obj => new { Name = obj.Key, Amount = obj.ToList().Count() })
             .OrderByDescending(z => z.Amount)
             .ToListAsync();

            var resultList = new List<AnalyticsDTO>();
            foreach (var item in list)
            {
                var foodDrink = await _dbContext.FoodsDrinks.FirstOrDefaultAsync(x => x.Id == item.Name);
                if (foodDrink != null)
                    resultList.Add(new AnalyticsDTO { DataName = foodDrink.Name, DataValue = item.Amount });
            }

            return resultList;
        }

    }
}
using System.Collections.Generic;

namespace API.Models
{
    public class PaidOrder
    {
        public int Id { get; set; }
        public int Table { get; set; }

        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        public int FoodDrinkId { get; set; }
        public FoodDrink FoodDrink { get; set; }

        //TODO ADD CASH OR BANKCARD

    }
}
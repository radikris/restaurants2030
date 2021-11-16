using System.Collections.Generic;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Table { get; set; }

        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

        public int FoodDrinkId { get; set; }
        public FoodDrink FoodDrink { get; set; }

        public OrderStatusId OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}
using API.Models;

namespace API.DTO
{
    public class FoodDrinkDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
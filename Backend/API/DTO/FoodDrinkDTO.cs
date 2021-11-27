using API.Models;

namespace API.DTO
{
    public class FoodDrinkDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }

        public FoodDrinkDTO(FoodDrink fd)
        {
            Id = fd.Id;
            Name = fd.Name;
            Price = fd.Price;
            Quantity = 0;
        }
        public FoodDrinkDTO(int id, string name, int price, int quantity)
        {
            Id = id;
            Name = name;
            Price = price;
            Quantity = quantity;
        }
    }
}
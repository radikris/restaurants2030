using API.Models;

namespace API.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int Table { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public OrderStatusId OrderStatus { get; set; }
    }
}
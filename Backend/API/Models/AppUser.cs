using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser
    {
        public int RestaurantId { get; set; } 
        public Restaurant Restaurant { get; set; }
    }
}
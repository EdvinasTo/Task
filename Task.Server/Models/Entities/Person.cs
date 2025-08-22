using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Task.Server.Models;

namespace Task.Server.Models.Entities
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public PersonInfo PersonInfo { get; set; }
    }
}
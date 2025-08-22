using Task.Server.Models.Entities;
using Task.Server.Models;
using System;

namespace Task.Server.Mappers
{
    public static class PersonMapper
    {
        public static Person ToEntity(PersonInfo info) =>
            new Person
            {
                PersonInfo = new PersonInfo
                {
                    Name = info.Name,
                    Address = info.Address,
                    Phone = info.Phone
                }
            };
    }
}

using Microsoft.AspNetCore.Mvc;
using Task.Server.Interfaces;
using Task.Server.Models.RequestDtos;
using Task.Server.Models.ResponseDtos;
using Task.Server.Models.Enums;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace Task.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackagesController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreatePackage([FromBody] CreatePackageRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _packageService.CreatePackageAsync(request);

                return CreatedAtAction(
                    nameof(GetPackageDetails),
                    new { id = result.Id },
                    new { Id = result.Id }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<PackageResponseDto[]>> GetAllPackages()
        {
            try
            {
                var result = await _packageService.GetAllPackagesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PackageDetailsResponseDto>> GetPackageDetails(int id)
        {
            try
            {
                var result = await _packageService.GetPackageDetailsAsync(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}/status")]
        public async Task<ActionResult<PackageDetailsResponseDto>> UpdatePackageStatus(
            int id,
            [FromBody] UpdatePackageStatusRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _packageService.UpdatePackageStatusAsync(id, request.Status);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
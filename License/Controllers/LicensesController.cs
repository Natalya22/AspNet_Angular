using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using License.Models;
using XSystem.Security.Cryptography;
using System.Text;

namespace License.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicensesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public LicensesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Licenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<License.Models.License>>> GetLicenses()
        {
            return await _context.Licenses.ToListAsync();
        }

        // GET: api/Licenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<License.Models.License>> GetLicense(int id)
        {
            var license = await _context.Licenses.FindAsync(id);

            if (license == null)
            {
                return NotFound();
            }

            return license;
        }

        // PUT: api/Licenses/5
        [HttpPut]
        public async Task<IActionResult> PutLicense(License.Models.License license)
        {
            if (!LicenseExists(license.Id))
            {
                return NotFound();
            }

            license.DigitalSignature = GetHash(license.Organization
                                                + license.SerialNumber
                                                + license.IssueDate.ToString()
                                                + license.Validity.ToString()
                                                + license.period.ToString());

            _context.Entry(license).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                Console.WriteLine("Something with update license went wrong!");
            }

            return NoContent();
        }

        // POST: api/Licenses
        [HttpPost]
        public async Task<ActionResult<License.Models.License>> PostLicense(License.Models.License license)
        {
            license.DigitalSignature = GetHash(license.Organization
                                                + license.SerialNumber
                                                + license.IssueDate.ToString()
                                                + license.Validity.ToString()
                                                + license.period.ToString());

            _context.Licenses.Add(license);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLicense", new { id = license.Id }, license);
        }

        // DELETE: api/Licenses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<License.Models.License>> DeleteLicense(int id)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null)
            {
                return NotFound();
            }

            _context.Licenses.Remove(license);
            await _context.SaveChangesAsync();

            return license;
        }

        private bool LicenseExists(int id)
        {
            return _context.Licenses.Any(e => e.Id == id);
        }

        private string GetHash(string plaintext)
        {
            var sha = new SHA1Managed();
            byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(plaintext));
            return Convert.ToBase64String(hash);
        }
    }
}

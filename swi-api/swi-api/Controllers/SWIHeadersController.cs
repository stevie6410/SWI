using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using swi_api.Models;

namespace swi_api.Controllers
{
    public class SWIHeadersController : ApiController
    {
        private SWIDB db = new SWIDB();

        // GET: api/SWIHeaders
        public IQueryable<SWIHeader> GetSWIHeaders()
        {
            return db.SWIHeaders;
        }

        // GET: api/SWIHeaders/5
        [ResponseType(typeof(SWIHeader))]
        public async Task<IHttpActionResult> GetSWIHeader(int id)
        {
            SWIHeader sWIHeader = await db.SWIHeaders
                .Include(x => x.SWIAuthor)
                .Include(x => x.SWIExpert)
                .Include(x => x.SWIApprover)
                .Include(x => x.SWICompany)
                .Include(x => x.SWIAuthor)
                .Include(x => x.SWIStages)
                .Include(x => x.SWIHSItems)
                .Include(x => x.SWITools)
                .Include(x => x.SWIHSItems)
                .Include(x => x.SWITags)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (sWIHeader == null)
            {
                return NotFound();
            }

            return Ok(sWIHeader);
        }

        // PUT: api/SWIHeaders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSWIHeader(int id, SWIHeader sWIHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sWIHeader.Id)
            {
                return BadRequest();
            }

            db.Entry(sWIHeader).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SWIHeaderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SWIHeaders
        [ResponseType(typeof(SWIHeader))]
        public async Task<IHttpActionResult> PostSWIHeader(SWIHeader sWIHeader)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SWIHeaders.Add(sWIHeader);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = sWIHeader.Id }, sWIHeader);
        }

        // DELETE: api/SWIHeaders/5
        [ResponseType(typeof(SWIHeader))]
        public async Task<IHttpActionResult> DeleteSWIHeader(int id)
        {
            SWIHeader sWIHeader = await db.SWIHeaders.FindAsync(id);
            if (sWIHeader == null)
            {
                return NotFound();
            }

            db.SWIHeaders.Remove(sWIHeader);
            await db.SaveChangesAsync();

            return Ok(sWIHeader);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SWIHeaderExists(int id)
        {
            return db.SWIHeaders.Count(e => e.Id == id) > 0;
        }
    }
}
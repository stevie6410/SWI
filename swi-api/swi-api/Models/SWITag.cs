//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace swi_api.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class SWITag
    {
        public int Id { get; set; }
        public int Tag { get; set; }
        public int SWI { get; set; }
    
        public virtual SWIHeader SWIHeader { get; set; }
        public virtual Tag Tag1 { get; set; }
    }
}
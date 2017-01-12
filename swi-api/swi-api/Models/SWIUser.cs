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
    
    public partial class SWIUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SWIUser()
        {
            this.AuthoredSWIs = new HashSet<SWIHeader>();
            this.ExpertSWIs = new HashSet<SWIHeader>();
            this.ApprovedSWIs = new HashSet<SWIHeader>();
            this.CreatedObservations = new HashSet<SWIObservation>();
            this.ModifiedObservations = new HashSet<SWIObservation>();
            this.SWISecurityTokens = new HashSet<SWISecurityToken>();
        }
    
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public int DefaultCompany { get; set; }
        public int Role { get; set; }
    
        public virtual SWICompany UserDefaultCompany { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWIHeader> AuthoredSWIs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWIHeader> ExpertSWIs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWIHeader> ApprovedSWIs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWIObservation> CreatedObservations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWIObservation> ModifiedObservations { get; set; }
        public virtual SWIRole SWIRole { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SWISecurityToken> SWISecurityTokens { get; set; }
    }
}
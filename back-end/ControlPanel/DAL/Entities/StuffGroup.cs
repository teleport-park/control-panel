using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.DAL.Entities {
    public class StuffGroup {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<StuffGroupPermission> Permissions { get; set; }
    }
}

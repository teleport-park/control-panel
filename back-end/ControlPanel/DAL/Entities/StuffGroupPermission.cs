using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.DAL.Entities {
    public class StuffGroupPermission {
        public int Id { get; set; }
        public int StuffGroupId { get; set; }
        public virtual StuffGroup StuffGroup { get; set; }
        public int PermissionId { get; set; }
        public virtual Permission Permission { get; set;}

    }
}

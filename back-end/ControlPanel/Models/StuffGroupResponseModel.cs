using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Models {
    public class StuffGroupResponseModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<PermissionResponseModel> Permissions { get; set; }
    }
}

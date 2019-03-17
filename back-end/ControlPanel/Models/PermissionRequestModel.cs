using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Models {
    public class PermissionRequestModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PermissionId { get; set; }
        public int StuffGroupId { get; set; }
    }
}

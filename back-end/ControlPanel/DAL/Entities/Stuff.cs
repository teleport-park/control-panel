using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.DAL.Entities {
    public class Stuff {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int StuffGroupId { get; set; }
        public virtual StuffGroup StuffGroup { get; set;}
        public bool IsEnabled { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Models {
    public class StuffResponseModel {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public StuffGroupResponseModel Group { get; set; }
        public bool IsEnabled { get; set; }
    }
}

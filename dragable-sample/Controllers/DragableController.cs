using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dragable_sample.Controllers
{
    public class DragableController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

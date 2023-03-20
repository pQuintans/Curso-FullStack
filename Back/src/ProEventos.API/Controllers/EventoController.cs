using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
                new Evento() {
                    EventoId = 1,
                    Local = "São Paulo",
                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                    Tema = "Angular e .NET Core",
                    QtdPessoas = 250,
                    Lote = "1º Lote",
                    ImagemURL = "foto1.png"
                },
                new Evento() {
                    EventoId = 2,
                    Local = "São Paulo",
                    DataEvento = DateTime.Now.AddDays(12).ToString("dd/MM/yyyy"),
                    Tema = "Angular e .NET Core",
                    QtdPessoas = 250,
                    Lote = "1º Lote",
                    ImagemURL = "foto1.png"
                }
        };

        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]	
        public IEnumerable<Evento> Get(int id)
        {
            return _evento.Where(e => e.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "post";
        }
    }
}

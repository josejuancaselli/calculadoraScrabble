import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"


const Inicio = () => {

    const checkJugadoresStorage = localStorage.getItem("jugadores")
    const traerJugadoresStorage = JSON.parse(localStorage.getItem("jugadores"))

    const [input, setInput] = useState("");
    const [arrayJugadores, setArrayJugadores] = useState(checkJugadoresStorage === null ? []: traerJugadoresStorage);

    const nombreJugador = (e) => {
        const nombreInput = e.target.value
        setInput(nombreInput)
    }

    const jugadorAgregado = () => {
        if (input !== "") {
            const jugadores = [...arrayJugadores, { nombre: input, id: arrayJugadores.length + 1, puntos: 0  }];
            setArrayJugadores(jugadores)
            localStorage.setItem("jugadores", JSON.stringify(jugadores))
            setInput("")
        }
    }



    return (
        <div>
            <form className="formulario">
                <label >ingrese jugador</label>
                <input className="form-jugador" type="text" onChange={nombreJugador} />
                <button className="boton-jugador" type="button" onClick={() => { jugadorAgregado() }}>agregar</button>
            </form>

            {
                arrayJugadores === null ? <p>no hay jugadores</p> : arrayJugadores.map((el, index) => {return (<h2 key={index} className="nombre-jugador-inicio">{el.nombre}</h2>)})
            }
            <button className="link">
                <Link to="/calculadora">Empezar</Link>
            </button>
        </div>
    );
}

export default Inicio
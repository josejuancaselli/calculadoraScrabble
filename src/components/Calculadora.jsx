import { useEffect, useState } from "react";
import "./calculadora.css"

const Calculadora = () => {

    const jugadoresStorage = JSON.parse(localStorage.getItem("jugadores")) || []; // traigo a los jugadores del storage
    const [puntoPalabra, setPuntoPalabra] = useState(0) //se guardan los puntos de la palabra
    const [jugadorActualizado, setJugadorActualizado] = useState([])
    const [disabled, setDisabled] = useState({})

    const capturarPuntosPalabra = (e) => { //funcion para capturar los puntos de la palabra
        setPuntoPalabra(e.target.value) // se actualiza los puntos de la palabra
    }

    const sumarPuntos = (id) => { // funcion para sumar los puntos

        // const jugador =  jugadoresStorage.map((doc) => {return ( doc.id === id ? {...doc, puntos: parseInt(doc.puntos) + parseInt(puntoPalabra)}: doc)})
        // setJugadorActualizado(jugador)
        // setDisabled ({...disabled, [id]: true})
        
        const jugador = jugadoresStorage.find((el) => el.id === id)
        if (jugador) {
            const nuevosPuntos = { ...jugador, puntos: parseInt(puntoPalabra) + parseInt(jugador.puntos) }
            setJugadorActualizado([...jugadorActualizado, nuevosPuntos])
            setDisabled({ ...disabled, [id]: true })
            console.log("sumando tengo", puntoPalabra)
        }
    }

    const terminarTurno = () => {
        localStorage.setItem("jugadores", JSON.stringify(jugadorActualizado))
        setJugadorActualizado([])
        setDisabled({})
        
    }

    const deshacerPuntos = (id) => {

        setJugadorActualizado(jugadoresStorage)
        setDisabled(true)

    }

    return (
        <div className="app-container">
            {
                jugadoresStorage.map((doc, index) => {
                    return (
                        <div className="container" key={index}>

                            <h2 className="nombre-jugador">{doc.nombre}</h2> {/* mostrar nombre jugador*/}

                            <input type="text" placeholder="Palabra" className="palabra" /> {/* capturar la palabra*/}

                            <p className="puntos-jugador" > {doc.puntos}  </p> {/* renderizar los puntos*/}

                            <div className="puntos-container">
                                <input type="text" placeholder="" className="puntos-palabra" onChange={capturarPuntosPalabra} /> {/* capturar puntos por la palabra*/}
                                <input type="checkbox" className="premio" /> {/* volver a quedar deschekeado cuando termina el turno*/}
                                <button className="sumar" disabled={disabled[doc.id]} onClick={() => { sumarPuntos(doc.id) }}>sumar</button> {/* sumar los puntos*/}
                            </div>

                            <div className="cambio-fichas-container">
                                <button className="cambio-fichas"></button> {/* cambio de color con un click*/}
                                <button className="cambio-fichas"></button> {/* cambio de color con un click*/}
                                <button className="cambio-fichas"></button> {/* cambio de color con un click*/}
                            </div>
                        </div>
                    )
                })
            }
            {
                console.log("jugador actualizado es", jugadorActualizado)
            }
            {
                console.log("el valor a sumar es", puntoPalabra)
            }
            <button onClick={() => { terminarTurno() }}>Terminar Turno</button> {/* limpia todo menos los puntos y el cambio de ficha, deschequea el box de premio, imprime los turnos abajo*/}
            <button className="deshacer" type="button" onClick={() => { deshacerPuntos() }}>Deshacer</button> {/* deshacer los puntos*/}


        </div>
    )
}

export default Calculadora
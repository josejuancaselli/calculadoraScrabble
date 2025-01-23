import { useState } from "react";
import "./calculadora.css";

const Calculadora = () => {
    const [jugadoresStorage, setJugadoresStorage] = useState(JSON.parse(localStorage.getItem("jugadores")) || []);
    const [botonesClickeados, setBotonesClickeados] = useState({});
    const [puntosPorJugador, setPuntosPorJugador] = useState({});
    const [palabrasPorJugador, setPalabrasPorJugador] = useState({});
    const [historial, setHistorial] = useState([]);
    const [premioPorJugador, setPremioPorJugador] = useState({});

    const puntosJugador = (e, jugador) => {
        setPuntosPorJugador({ ...puntosPorJugador, [jugador.id]: e.target.value });
    };

    const terminarTurno = () => {
        const jugadoresActualizados = jugadoresStorage.map((jugador) => {
            return ({ ...jugador, puntos: parseInt(jugador.puntos) + parseInt(puntosPorJugador[jugador.id] || 0), });
        });

        setJugadoresStorage(jugadoresActualizados);
        localStorage.setItem("jugadores", JSON.stringify(jugadoresActualizados));

        const nuevoHistorial = jugadoresStorage.map((jugador) => (
            {
                nombre: jugador.nombre,
                puntos: parseInt(puntosPorJugador[jugador.id] || 0),
                palabra: palabrasPorJugador[jugador.id] || "",
                premio: premioPorJugador[jugador.id] || false,
            }
        ))

        setHistorial([...historial, ...nuevoHistorial]);
        setPuntosPorJugador({});
        setPalabrasPorJugador({});
        setPremioPorJugador({});

    };

    const botonCambio = (jugadorId, botonId) => {
        const botonesDelJugador = botonesClickeados[jugadorId] || [];
        if (!botonesDelJugador.includes(botonId)) {
            setBotonesClickeados({ ...botonesClickeados, [jugadorId]: [...botonesDelJugador, botonId], });
        }
    };

    const manejarCheckbox = (jugadorId, isChecked) => {
        setPremioPorJugador({ ...premioPorJugador, [jugadorId]: isChecked });
    };

    const palabras = (e, jugador) => {
        setPalabrasPorJugador({ ...palabrasPorJugador, [jugador.id]: e.target.value });
    }



    return (
        <div className="app-container">
            {
                jugadoresStorage.map((doc, index) => {
                    return (
                        <div className="container" key={index}>
                            <h2 className="nombre-jugador">{doc.nombre}</h2> {/* Mostrar nombre del jugador*/}

                            <input type="text"
                                placeholder="Palabra"
                                className="palabra"
                                value={palabrasPorJugador[doc.id] || ""}
                                onChange={(e) => { palabras(e, doc) }}
                            /> {/* Capturar la palabra*/}

                            <p className="puntos-jugador">{doc.puntos}</p> {/* Mostrar puntos*/}

                            <div className="puntos-container">
                                <input
                                    type="text"
                                    placeholder=""
                                    value={puntosPorJugador[doc.id] || ""}
                                    onChange={(e) => { puntosJugador(e, doc); }}
                                    className="puntos-palabra"
                                />
                                <input type="checkbox"
                                    className="premio"
                                    checked={premioPorJugador[doc.id] || false}
                                    onChange={(e) => manejarCheckbox(doc.id, e.target.checked)}
                                />
                            </div>

                            <div className="cambio-fichas-container">
                                {[0, 1, 2].map((botonId) => {
                                    const botonYaClickeado = botonesClickeados[doc.id] && botonesClickeados[doc.id].includes(botonId)
                                    return (
                                        <button
                                            key={botonId}
                                            className="cambio-fichas"
                                            disabled={botonYaClickeado}
                                            onClick={() => { botonCambio(doc.id, botonId); }}
                                            style={{ backgroundColor: botonYaClickeado ? "red" : "green", }}
                                        >
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            }
            <button onClick={terminarTurno}>Terminar Turno</button>

            <div>
                {jugadoresStorage.map((jugador) => {
                    
                    const historialJugador = historial.filter((entry) => entry.nombre === jugador.nombre);
                    if (historialJugador.length === 0) return null; // Si no hay historial para este jugador, no mostramos nada
                    return (
                        <div key={jugador.id}>
                            <h5>{jugador.nombre}</h5> {/* Nombre del jugador, se renderiza solo una vez */}
                            {historialJugador.map((turno, index) => (
                                <div key={index}>
                                    <h6>-</h6>
                                    <p>Palabra: {turno.palabra}</p>
                                    <p>Puntos: {turno.puntos}</p>
                                    {turno.premio && <p>Premio</p>}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calculadora;

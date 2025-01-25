import { useState } from "react";
import "./chatgpt.css";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const Calculadora = () => {
    const [jugadoresStorage, setJugadoresStorage] = useState(JSON.parse(localStorage.getItem("jugadores")) || []);
    const [botonesClickeados, setBotonesClickeados] = useState({});
    const [puntosPorJugador, setPuntosPorJugador] = useState({});
    const [palabrasPorJugador, setPalabrasPorJugador] = useState({});
    const [historial, setHistorial] = useState([]);
    const [premioPorJugador, setPremioPorJugador] = useState({});
    const [turnoActual, setTurnoActual] = useState(1);
    const [historialCambioFichas, setHistorialCambioFichas] = useState([]);

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
                turno: turnoActual,
            }
        ));

        setHistorial([...historial, ...nuevoHistorial]);
        setPuntosPorJugador({});
        setPalabrasPorJugador({});
        setPremioPorJugador({});
        setTurnoActual(turnoActual + 1);
    };

    const botonCambio = (jugadorId, botonId) => {
        const botonesDelJugador = botonesClickeados[jugadorId] || [];
        if (!botonesDelJugador.includes(botonId)) {
            setBotonesClickeados({ ...botonesClickeados, [jugadorId]: [...botonesDelJugador, botonId] });
            setHistorialCambioFichas([
                ...historialCambioFichas,
                { jugadorId, botonId, turno: turnoActual },
            ]);
        }
    };

    const manejarCheckbox = (jugadorId, isChecked) => {
        setPremioPorJugador({ ...premioPorJugador, [jugadorId]: isChecked });
    };

    const palabras = (e, jugador) => {
        setPalabrasPorJugador({ ...palabrasPorJugador, [jugador.id]: e.target.value });
    };

    const resetearJuego = () => {
        localStorage.clear();
        setJugadoresStorage([]);
        setBotonesClickeados({});
        setPuntosPorJugador({});
        setPalabrasPorJugador({});
        setHistorial([]);
        setHistorialCambioFichas([]);
        setTurnoActual(1);
    };

    return (
        <div className="app-container">
            <div className="jugadores-container">
                {jugadoresStorage.map((doc, index) => {
                    return (
                        <div className="container" key={index}>

                            <h2 className="nombre-jugador">{doc.nombre}</h2>

                            <input
                                type="text"
                                placeholder="Palabra"
                                className="palabra"
                                value={palabrasPorJugador[doc.id] || ""}
                                onChange={(e) => palabras(e, doc)}
                            />


                            <div className="puntos-fichas">

                                <div className="puntos-container">
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={puntosPorJugador[doc.id] || ""}
                                        onChange={(e) => puntosJugador(e, doc)}
                                        className="puntos-palabra"
                                    />
                                    <input
                                        type="checkbox"
                                        className="premio"
                                        checked={premioPorJugador[doc.id] || false}
                                        onChange={(e) => manejarCheckbox(doc.id, e.target.checked)}
                                    />
                                </div>

                                <div className="cambio-fichas-container">
                                    {[0, 1, 2].map((botonId) => {
                                        const botonYaClickeado =
                                            botonesClickeados[doc.id] &&
                                            botonesClickeados[doc.id].includes(botonId);
                                        return (
                                            <button
                                                key={botonId}
                                                className="cambio-fichas"
                                                disabled={botonYaClickeado}
                                                onClick={() => botonCambio(doc.id, botonId)}

                                            />
                                        );
                                    })}
                                </div>

                            </div>
                            <p className="puntos-jugador">{doc.puntos}</p>
                        </div>
                    );
                })}
            </div>

            <button onClick={terminarTurno} className="terminar-turno">Terminar Turno</button>

            <div className="historial">
                <div className="historial-jugadores">
                    {jugadoresStorage.map((jugador) => {
                        const historialJugador = historial.filter(
                            (entry) => entry.nombre === jugador.nombre
                        );
                        if (historialJugador.length === 0) return null;
                        return (
                            <div key={jugador.id} >
                                <h5>{jugador.nombre}</h5>
                                {historialJugador.map((turno, index) => (
                                    <div key={index} className="detalle-historial">
                                        <h6>--------</h6>
                                        <div className="punto-palabra">
                                            <p>Turno: {turno.turno}</p>
                                            <p>Palabra: {turno.palabra}</p>
                                            <p>Puntos: {turno.puntos}</p>
                                            {turno.premio ? <p>Premio: <FaCheck style={{ color: "green" }} /> </p> : <p>Premio: <IoMdClose style={{ color: "red" }} /></p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                <div className="historial-cambio">
                    <h3>Historial de cambios de fichas</h3>
                    {historialCambioFichas.map((entry, index) => (
                        <p key={index}>
                            Jugador: {jugadoresStorage.find((j) => j.id === entry.jugadorId)?.nombre} - turno {entry.turno} </p>
                    ))}
                </div>

            </div>
            <button onClick={resetearJuego}> Reinciar</button>
            <Link to="/">Inicio</Link>
        </div>
    );
};

export default Calculadora;

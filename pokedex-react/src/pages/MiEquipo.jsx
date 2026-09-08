import { useEffect, useState } from "react";
import {
    obtenerEquipo,
    actualizarPokemon
} from "../services/equipoApi";
import { eliminarPokemon } from "../services/equipoApi";
const liberarPokemon = async (id) => {
    await eliminarPokemon(id);
    cargarEquipo();
};
function MiEquipo({ actualizarEquipo }) {
    const [equipo, setEquipo] = useState([]);
    const [error, setError] = useState("");
            const cargarEquipo = async () => {
            try {
                const datos = await obtenerEquipo();
                setEquipo(datos);
            } catch (error) {
                setError(error.message);
            }
        };
        const subirNivel = async (pokemon) => {
    await actualizarPokemon(
        pokemon.id,
        { nivel: pokemon.nivel + 1 }
    );

    cargarEquipo();
};
const cambiarFavorito = async (pokemon) => {
    await actualizarPokemon(
        pokemon.id,
        { favorito: !pokemon.favorito }
    );

    cargarEquipo();
};
const liberarPokemon = async (id) => {
    await eliminarPokemon(id);
    cargarEquipo();
};

    useEffect(() => {
        cargarEquipo();
    }, [actualizarEquipo]);

    return (
        <section>
            <h2>Mis mascotas Favoritas</h2>

            {error && <p>{error}</p>}

            {equipo.length === 0 ? (
                <p>
                    Todavía no tienes Pokémon en tu equipo.
                </p>
            ) : (
                equipo.map((pokemon) => (
                    <article key={pokemon.id}>
                        <h3>{pokemon.nombre}</h3>
                        <img
                            src={pokemon.imagen}
                            alt={pokemon.nombre}
                        />
                        <p>Nivel: {pokemon.nivel}</p>
                        <button
    onClick={() => subirNivel(pokemon)}
>
    Subir nivel
</button>

<button
    onClick={() => cambiarFavorito(pokemon)}
>
    {pokemon.favorito
        ? "Quitar favorito"
        : "Marcar favorito"}
</button>
                        <button
    onClick={() =>
        liberarPokemon(pokemon.id)
    }
>
    Liberar Pokémon
</button>
                    </article>
                ))
            )}
        </section>
    );
}
export default MiEquipo;





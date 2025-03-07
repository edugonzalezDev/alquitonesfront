import React, { useState, useEffect } from "react";
import { localDB } from "../../database/LocalDB";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Datos de ejemplo para arriendos (en una aplicación real, estos vendrían de una API o base de datos)
    const arriendosEjemplo = [
        {
            "ID": 1,
            "Imagen": "https://example.com/images/guitar.jpg",
            "Nombre": "Guitarra Eléctrica",
            "Categoria": "Cuerda",
            "Estado": "Disponible",
            "Duracion": "7 días"
        },
        {
            "ID": 2,
            "Imagen": "https://example.com/images/piano.jpg",
            "Nombre": "Piano Acústico",
            "Categoria": "Teclado",
            "Estado": "En uso",
            "Duracion": "10 días"
        },
        {
            "ID": 3,
            "Imagen": "https://example.com/images/drum.jpg",
            "Nombre": "Batería",
            "Categoria": "Percusión",
            "Estado": "Disponible",
            "Duracion": "5 días"
        },
        {
            "ID": 4,
            "Imagen": "https://example.com/images/violin.jpg",
            "Nombre": "Violín",
            "Categoria": "Cuerda",
            "Estado": "En reparación",
            "Duracion": "3 días"
        },
        {
            "ID": 5,
            "Imagen": "https://example.com/images/trumpet.jpg",
            "Nombre": "Trompeta",
            "Categoria": "Viento",
            "Estado": "Disponible",
            "Duracion": "7 dias"
        }
    ];

    useEffect(() => {
        const checkUser = () => {
            const currentUser = localDB.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
            }
            setLoading(false);
        };

        // Verificar estado inicial
        checkUser();
    }, []);

    const handleLogout = () => {
        localDB.logout();
        navigate('/login');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Cargando...</p>
            </div>
        );
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    // Obtener el primer nombre para el saludo
    const firstName = user.username ? user.username.split(" ")[0] : "";

    return (
        <>
            <div className="bg-(--color-primary) text-white text-center py-15">
                <h1 className="text-4xl font-bold">Hola {firstName}, ¡buenas tardes!</h1>
                <p className="text-lg mt-2">¡Te damos la bienvenida a tu perfil!</p>
            </div>
            <table className="mt-8 container md:w-2/3 mx-auto px-6 py-8">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left font-bold text-2xl">Información Personal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 font-semibold">Nombre:</td>
                        <td className="px-4 py-2">{user.username || "No disponible"}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 font-semibold">Email:</td>
                        <td className="px-4 py-2">{user.email || "No disponible"}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 font-semibold">Rol:</td>
                        <td className="px-4 py-2">{user.role || "No disponible"}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 font-semibold">Te uniste el: </td>
                        <td className="px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "No disponible"}</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-8 flex justify-around container md:w-2/3 mx-auto">
                <button 
                    onClick={() => handleNavigation('/')} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-(--color-primary)"
                >
                    Agendar Arriendo
                </button>
                <button 
                    onClick={() => handleNavigation('/')} 
                    className="bg-(--color-secondary) text-white px-6 py-2 rounded-lg hover:bg-(--color-primary) flex items-center"
                >
                    Ver Catálogo
                    <span className="material-symbols-outlined pl-4">arrow_forward</span>
                </button>
            </div>

            <div className="container mx-auto py-8 md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800 text-center">Últimos 5 Arriendos</h3>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Imagen</th>
                                <th className="px-4 py-2 text-left">Nombre</th>
                                <th className="px-4 py-2 text-left">Categoria</th>
                                <th className="px-4 py-2 text-left">Estado</th>
                                <th className="px-4 py-2 text-left">Duracion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arriendosEjemplo.map((arriendo, index) => (
                                <tr key={arriendo.ID || index}>
                                    <td className="px-4 py-2 border-b">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{arriendo.Imagen}</td>
                                    <td className="px-4 py-2 border-b">{arriendo.Nombre}</td>
                                    <td className="px-4 py-2 border-b">{arriendo.Categoria}</td>
                                    <td className="px-4 py-2 border-b">{arriendo.Estado}</td>
                                    <td className="px-4 py-2 border-b">{arriendo.Duracion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
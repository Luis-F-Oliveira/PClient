import { Home, Users } from "lucide-react";

export const listOfPages = [
    {
        icon: <Home className="mr-2 h-4 w-4" />,
        name: "Principal",
        path: "/public",
        group: "Publico",
        roles: [""],
    },
    {
        icon: <Users className="mr-2 h-4 w-4" />,
        name: "Usuários",
        path: "/admin/users",
        group: "Administração",
        roles: ["admin"],
    },
]
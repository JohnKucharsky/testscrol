import React, { useState } from "react";
// Components
import User from "./User";
// Styles
import { Content, Loading } from "./App.styles";
// API
import { getUsers } from "./API";
import { useEffect } from "react";

function App() {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage((p) => p + 1);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            const newUsers = await getUsers(page);
            setUsers((prev) => [...prev, ...newUsers]);
            setLoading(false);
        };
        loadUsers();
    }, [page]);

    return (
        <div className="App">
            <Content onScroll={handleScroll}>
                {users &&
                    users.map((user) => <User key={user.cell} user={user} />)}
            </Content>
            {loading && <Loading>Loading ...</Loading>}
        </div>
    );
}

export default App;

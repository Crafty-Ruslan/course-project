import React, { useState } from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users);

    const getQualityClasses = (color) => {
        let classes = 'badge m-2 bg-' + color;
        return classes;
    };
    const handleDelete = (userToDel) => {
        setUsers((prevState) => prevState.filter((user) => user !== userToDel));
        console.log('click ', userToDel.name);
    };
    const renderPhrase = (number) => {
        if ((number < 10 && number % 10 === 2) || number % 10 === 3 || number % 10 === 4) {
            return number + ' человека';
        } else return number + ' человек';
    };

    if (users.length === 0) {
        return (
            <>
                <span className="badge m-2 bg-danger">никто с тобой не тусанет </span>
            </>
        );
    } else {
        return (
            <>
                <span className="badge m-2 bg-primary">{renderPhrase(users.length)} тусанет с тобой сегодня</span>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((qu) => (
                                        <span key={qu._id} className={getQualityClasses(qu.color)}>
                                            {qu.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(user)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
};

export default Users;

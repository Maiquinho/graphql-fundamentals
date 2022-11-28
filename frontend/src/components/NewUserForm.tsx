import { gql, useMutation } from '@apollo/client';
import { FormEvent, useState } from "react";


const CREATE_USER = gql`

    mutation ($name: String!) {
        createUser(name: $name){
            id
            name
        }
    }

`;


export function NewUserForm(){
    const [name, setName] = useState('');
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    async function handleCreateUser(event: FormEvent){
        event.preventDefault();

        if(!name){
            return;
        };

        await createUser({
            variables: {
                name,
            }
        });

        console.log(data);
    }

    return(
        <form onSubmit={handleCreateUser}>
            <input type="text" placeholder="Nome do usuário" value={name} onChange={event => setName(event.target.value)} />
            <button type="submit">Inserir usuário</button>
        </form>
    );
}
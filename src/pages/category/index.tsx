import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import { toast } from "react-toastify";

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso!');
        setName('');
    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Pizzaria</title>
            </Head>
            <Header />
            <div>
                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            placeholder="Cadastre uma nova categoria"
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className={styles.button} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})
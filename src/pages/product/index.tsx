import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";

import { toast } from "react-toastify";

type ItemProps = {
    id: string,
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/png' || image.type === 'image/jpeg') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    //altera para categoria selecionada
    function handleChangeCategory(event) {
        //console.log('Categoria selecionada: ', categories[event.target.value]);
        setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error("Preencha todos os campos!");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success("Produto cadastrado com sucesso!");

        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar!");
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
    }

    return (
        <>
            <Head>
                <title>Novo Produto - Pizzaria</title>
            </Head>
            <Header />
            <div>
                <main className={styles.container}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do Produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                            placeholder="Digite o nome do produto"
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            placeholder="Digite o preço do produto"
                            type="text"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <textarea
                            placeholder="Descreva seu produto..."
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/categories');

    return {
        props: {
            categoryList: response.data
        }
    }
})
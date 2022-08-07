import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Faça seu cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo" className={styles.image} />


                <div className={styles.login}>
                    <h1>Criando sua Conta</h1>
                    <form>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                        />
                        <Input
                            placeholder="Digite seu e-mail"
                            type="text"
                        />
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                        />

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Cadastrar
                        </Button>
                    </form>
                    <Link href="/">
                        < a className={styles.text}>Já possui uma conta? Então faça login!</a>
                    </Link>

                </div>
            </div>
        </>
    )
}

import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo4.svg';

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" className={styles.image}/>

        <div className={styles.login}>
          <form>
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
              Acessar
            </Button>
          </form>
          <a className={styles.text}>Não possui uma conta? Então cadastre-se!</a>
        </div>
      </div>
    </>
  )
}

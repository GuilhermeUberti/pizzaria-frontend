import { canSSPAuth } from "../../utils/canSSPAuth"

export default function DashBoard() {
    return (
        <div>
            <h1>Bem vindo ao painel!</h1>
        </div>
    )
}

export const getServerSideProps = canSSPAuth(async (ctx) => {
    return {
        props: {}
    }
})
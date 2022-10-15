import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import logo from "../../Assets/logo.png";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(UserContext);
    const navigate = useNavigate();
    localStorage.removeItem("token")

    function handleForm(e) {
        e.preventDefault();

        const body = {
            email,
            password
        }

        const post = axios.post(context.BASE_URL + '/signin', body);

        post.then((answer) => {
            localStorage.setItem("token", answer.data.token);
            navigate('/logged');
        });

        post.catch((error) => {
            alert('Erro! E-mail ou senha inválidos/inexistentes');
        });
    };

    return (
        <Page>
            <Header>
                <h1><Link to="/signin">Entrar</Link></h1>
                <h2><Link to="/signup">Cadastre-se</Link></h2>
            </Header>

            <Logo>
                <h1>Shortly</h1>
                <img src={logo} alt="shortly" />
            </Logo>

            <ContainerForm>
                <Form onSubmit={handleForm}>
                    <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                    <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>

                    <ContainerButton><Button>Entrar</Button></ContainerButton>
                </Form>
            </ContainerForm>
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 80px;
    padding-right: 100px;

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #5D9040;
        padding-right: 30px;
    }
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 200;
        font-size: 64px;
        line-height: 80px;
        color: #000000;
        padding-right: 12px;
    }
`;

const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex;
    
    input{
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        margin-top: 12px;
    }
`;

const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    width: 182px;
    height: 60px;
    background: #5D9040;
    border-radius: 12px;
    margin-top: 24px;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
    border: none;
`;
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import logo from "../../Assets/logo.png";
import cup from "../../Assets/cup.png";
import dotenv from "dotenv";
dotenv.config();

function RankingJSX({ name, linksCount, visitCount, index }) {
    return (
        <>
            <h1>{index} - {name} - {linksCount} Links - {visitCount} Visualizações</h1>
        </>
    );
}

export default function Homescreen() {
    const context = useContext(UserContext);
    const [ranking, setRanking] = useState([]);
    const [isLoading, setLoading] = useState(true);

    /* useEffect(() => {
        const getRanking = axios.get(context.getRanking);
    }, []); */

    useEffect(() => {
        const get = axios.get(context.BASE_URL + '/ranking');

        get.then((answer) => {
            setRanking(answer.data);
            setLoading(false);
        });

        get.catch((error) => {
            console.log(error);
        });

    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

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

            <Ranking>
                <img src={cup} alt="ranking" />
                <h1>Ranking</h1>
            </Ranking>

            <ContainerRankingBox>
                <RankingBox>
                    {ranking.map((rank, key) => <RankingJSX key={key} index={key + 1} name={rank.name} linksCount={rank.linksCount} visitCount={rank.visitCount} />)}
                </RankingBox>
            </ContainerRankingBox>

            <SignUp>
                <span><Link to="/signup">Crie sua conta para usar nosso serviço!</Link></span>
            </SignUp>
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

/* a:link {
    color: currentColor;
}

a:visited {
    color: currentColor;
}

a:hover {
    color: currentColor;
}

a:active {
    color: currentColor;
} */

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

const Ranking = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
        padding-left: 12px;
    }
`;

const ContainerRankingBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
`;

const RankingBox = styled.div`
    width: 1017px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 24px 24px 0px 0px;
    padding: 8px 24px 8px 24px;

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
    }
`;

const SignUp = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
    
    span {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
        color: #000000;
    }
`;
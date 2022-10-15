import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import logo from "../../Assets/logo.png";
import cup from "../../Assets/cup.png";

function RankingJSX({ name, linksCount, visitCount, index }) {
    return (
        <>
            <h1>{index} - {name} - {linksCount} Links - {visitCount} Visualizações</h1>
        </>
    );
}

export default function LoggedRanking() {
    const [ranking, setRanking] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        }

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

    function SignOut() {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const signOut = axios.delete(context.BASE_URL + '/signout', config);

        signOut.then(() => {
            localStorage.clear();
            navigate("/");
        });

        signOut.catch((error) => {
            console.log(error);
        });
    }

    function SignOut2() {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const signOutAll = axios.delete(context.BASE_URL + '/signoutall', config);

        signOutAll.then(() => {
            localStorage.clear();
            navigate("/");
        });

        signOutAll.catch((error) => {
            console.log(error);
        });
    }

    return (
        <Page>
            <Header>
                <Name><h1>Seja bem-vindo(a), {localStorage.getItem("name")}!</h1></Name>
                <Menu><h2><Link to="/logged">Home</Link></h2>
                    <h2><Link to="/ranking">Ranking</Link></h2>
                    <h2 onClick={() => { SignOut() }}>Sair</h2></Menu>
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

            <SignOutAll>
                <h1 onClick={() => { SignOut2() }}>Deslogar de todos os dispositivos</h1>
            </SignOutAll>
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 0px 248px 0px 248px;

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

const Name = styled.div``;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
    
    h2 {
        width: 41px;
        height: 18px;
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9C9C9C;
        cursor: pointer;
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

const SignOutAll = styled.span`
    display: flex;
    justify-content: center;
    margin: 69px 0px 24px 0px;
    cursor: pointer;
`;
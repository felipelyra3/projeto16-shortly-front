import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import logo from "../../Assets/logo.png";
import trashbin from "../../Assets/trashbin.png";

function ShortenLinkJSX({ url, shortUrl, visitCount, contextGetUrlOpenShortUrl, contextBaseUrl, id, setRefresh, refresh }) {
    const fullShortenLink = contextGetUrlOpenShortUrl + '/urls/open/' + shortUrl;
    return (
        <ContainerLink>
            <ShortenLink>
                <a href={fullShortenLink} target="_blank" rel="noopener noreferrer"><p onClick={() => { setRefresh(!refresh) }}>{url}</p></a>
                <a href={fullShortenLink} target="_blank" rel="noopener noreferrer"><p onClick={() => { setRefresh(!refresh) }}>{shortUrl}</p></a>
                <p>Quantidade de visitantes: {visitCount}</p>
            </ShortenLink>
            <Delete onClick={() => { DeleteLink(contextBaseUrl, id, setRefresh, refresh) }}>
                <img src={trashbin} alt="delete" />
            </Delete>
        </ContainerLink>
    );
}

function DeleteLink(contextBaseUrl, id, setRefresh, refresh) {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const deleteLink = axios.delete(contextBaseUrl + '/urls/' + id, config);

    deleteLink.then(() => {
        alert('Link deletado com sucesso!');
        setRefresh(!refresh);
    });

    deleteLink.catch((error) => {
        console.log(error);
        alert('Erro! Tente novamente');
    });
}

export default function LoggedHomepage() {
    const [link, setLink] = useState('');
    const [shortenLinks, setShortenLinks] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        /* if (Object.keys(token).length === 0) {
            navigate('/');
        } */
        if (!token) {
            navigate('/');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const get = axios.get(context.BASE_URL + '/users/me', config);

        get.then((answer) => {
            setShortenLinks(answer.data);
            localStorage.setItem("name", answer.data.name);
            setLoading(false);
        });

        get.catch((error) => {
            console.log(error);
        });

    }, [refresh]);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function handleForm(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const post = axios.post(context.BASE_URL + '/urls/shorten', { url: link }, config);

        post.then(() => {
            alert('Link encurtado com sucesso!');
            setRefresh(!refresh);
        });

        post.catch((error) => {
            console.log(error);
            alert('Deve-se inserir um link válido');
        });
    };

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
                <Name><h1>Seja bem-vindo(a), {shortenLinks.name}!</h1></Name>
                <Menu><h2><Link to="/logged">Home</Link></h2>
                    <h2><Link to="/ranking">Ranking</Link></h2>
                    <h2 onClick={() => { SignOut() }}>Sair</h2></Menu>
            </Header>

            <Logo>
                <h1>Shortly</h1>
                <img src={logo} alt="shortly" />
            </Logo>

            <ContainerForm>
                {/* <Form onSubmit={handleForm}>
                    <input type="text" id="link" placeholder="Links que cabem no bolso" value={link} onChange={(e) => { setLink(e.target.value) }} required></input>
                    <Button>Encurtar Link</Button>
                </Form> */}
                <form onSubmit={handleForm}>
                    <input type="text" id="link" placeholder="Links que cabem no bolso" value={link} onChange={(e) => { setLink(e.target.value) }} required></input>
                    <Button>Encurtar Link</Button>
                </form>
            </ContainerForm>

            <ContainerShortenLinks>
                {shortenLinks.shortenedUrls.length === 0 ? <p>Você ainda não encurtou nenhum link =(</p> : shortenLinks.shortenedUrls.map((link, key) => <ShortenLinkJSX key={key} url={link.url} shortUrl={link.shortUrl} visitCount={link.visitCount} contextGetUrlOpenShortUrl={context.BASE_URL} contextBaseUrl={context.BASE_URL} id={link.id} setRefresh={setRefresh} refresh={refresh} />)}
                {/* {shortenLinks.shortenedUrls.map((link, key) => <ShortenLinkJSX key={key} url={link.url} shortUrl={link.shortUrl} visitCount={link.visitCount} contextGetUrlOpenShortUrl={context.getUrlOpenShortUrl} contextDeleteUrl={context.deleteUrl} id={link.id} setRefresh={setRefresh} refresh={refresh} />)} */}
            </ContainerShortenLinks>

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

const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
    input {
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        padding-left: 12px;
        margin-right: 12px;
    }
`;

/* const Form = styled.div`
    input {
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        padding-left: 12px;
        margin-right: 12px;
    }
`; */

const Button = styled.button`
    width: 182px;
    height: 60px;
    background: #5D9040;
    border-radius: 12px;
    border: none;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
`;

const ContainerShortenLinks = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`;

const ContainerLink = styled.div`
    display: flex;
    margin-top: 50px;
`;

const ShortenLink = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 887px;
    height: 60px;
    background: #80CC74;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px 0px 0px 12px;
    padding: 0px 24px 0px 24px;

    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
`;

const Delete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 0px 12px 12px 0px;
    //border: 1px solid #80CC74;
`;

const SignOutAll = styled.span`
    display: flex;
    justify-content: center;
    margin: 69px 0px 24px 0px;
    cursor: pointer;
`;
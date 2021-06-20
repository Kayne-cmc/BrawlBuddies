import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import podium from '../../images/podium.png';
import './Home.css';
import AOS from 'aos';
import "aos/dist/aos.css";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

export default function Home() {

    const { loggedIn } = useContext(AuthContext);

    const theme = createMuiTheme({
        palette: {
            background: {
                paper: "transparent"
            },
            type: "dark",
        }
    });

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className="Home">
            <div className="introduction">
                <div className="main-page">
                    <h2 className="main-page-title">BrawlBuddies</h2>
                    <h5 className="main-page-description">Make new friend's on Brawlhalla and check on each other's stats!</h5>
                </div>
                {/* <svg id="wave" style={{transform:"rotate(180deg)", transition: "0.3s", marginBottom:"-5%"}} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(30, 144, 255, 1)" offset="0%"></stop><stop stop-color="rgba(0, 0, 128, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform:"translate(0, 0px)", opacity:"1"}} fill="url(#sw-gradient-0)" d="M0,343L60,343C120,343,240,343,360,343C480,343,600,343,720,285.8C840,229,960,114,1080,89.8C1200,65,1320,131,1440,179.7C1560,229,1680,261,1800,236.8C1920,212,2040,131,2160,106.2C2280,82,2400,114,2520,163.3C2640,212,2760,278,2880,269.5C3000,261,3120,180,3240,130.7C3360,82,3480,65,3600,114.3C3720,163,3840,278,3960,285.8C4080,294,4200,196,4320,147C4440,98,4560,98,4680,147C4800,196,4920,294,5040,326.7C5160,359,5280,327,5400,302.2C5520,278,5640,261,5760,245C5880,229,6000,212,6120,196C6240,180,6360,163,6480,163.3C6600,163,6720,180,6840,228.7C6960,278,7080,359,7200,351.2C7320,343,7440,245,7560,220.5C7680,196,7800,245,7920,236.8C8040,229,8160,163,8280,155.2C8400,147,8520,196,8580,220.5L8640,245L8640,490L8580,490C8520,490,8400,490,8280,490C8160,490,8040,490,7920,490C7800,490,7680,490,7560,490C7440,490,7320,490,7200,490C7080,490,6960,490,6840,490C6720,490,6600,490,6480,490C6360,490,6240,490,6120,490C6000,490,5880,490,5760,490C5640,490,5520,490,5400,490C5280,490,5160,490,5040,490C4920,490,4800,490,4680,490C4560,490,4440,490,4320,490C4200,490,4080,490,3960,490C3840,490,3720,490,3600,490C3480,490,3360,490,3240,490C3120,490,3000,490,2880,490C2760,490,2640,490,2520,490C2400,490,2280,490,2160,490C2040,490,1920,490,1800,490C1680,490,1560,490,1440,490C1320,490,1200,490,1080,490C960,490,840,490,720,490C600,490,480,490,360,490C240,490,120,490,60,490L0,490Z"></path></svg> */}
                <svg id="wave" style={{transform:"rotate(180deg)", transition: "0.3s"}} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(255,255,255,1)" offset="0%"></stop><stop stop-color="rgba(255,255,255,1)" offset="100%"></stop></linearGradient></defs><path style={{transform:"translate(0, 0px)", opacity:"1"}} fill="url(#sw-gradient-0)" d="M0,245L48,212.3C96,180,192,114,288,98C384,82,480,114,576,122.5C672,131,768,114,864,122.5C960,131,1056,163,1152,155.2C1248,147,1344,98,1440,138.8C1536,180,1632,310,1728,359.3C1824,408,1920,376,2016,367.5C2112,359,2208,376,2304,326.7C2400,278,2496,163,2592,147C2688,131,2784,212,2880,236.8C2976,261,3072,229,3168,253.2C3264,278,3360,359,3456,351.2C3552,343,3648,245,3744,228.7C3840,212,3936,278,4032,326.7C4128,376,4224,408,4320,383.8C4416,359,4512,278,4608,236.8C4704,196,4800,196,4896,187.8C4992,180,5088,163,5184,155.2C5280,147,5376,147,5472,163.3C5568,180,5664,212,5760,196C5856,180,5952,114,6048,147C6144,180,6240,310,6336,367.5C6432,425,6528,408,6624,400.2C6720,392,6816,392,6864,392L6912,392L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"></path></svg>
                {/* <svg id="wave" style={{transform:"rotate(180deg)", transition: "0.3s"}} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(30, 144, 255, 1)" offset="0%"></stop><stop stop-color="rgba(0, 0, 128, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform:"translate(0, 0px)", opacity:"1"}} fill="url(#sw-gradient-0)" d="M0,441L120,383.8C240,327,480,212,720,138.8C960,65,1200,33,1440,65.3C1680,98,1920,196,2160,220.5C2400,245,2640,196,2880,212.3C3120,229,3360,310,3600,302.2C3840,294,4080,196,4320,187.8C4560,180,4800,261,5040,294C5280,327,5520,310,5760,261.3C6000,212,6240,131,6480,106.2C6720,82,6960,114,7200,138.8C7440,163,7680,180,7920,171.5C8160,163,8400,131,8640,163.3C8880,196,9120,294,9360,310.3C9600,327,9840,261,10080,204.2C10320,147,10560,98,10800,65.3C11040,33,11280,16,11520,65.3C11760,114,12000,229,12240,245C12480,261,12720,180,12960,187.8C13200,196,13440,294,13680,310.3C13920,327,14160,261,14400,228.7C14640,196,14880,196,15120,179.7C15360,163,15600,131,15840,147C16080,163,16320,229,16560,253.2C16800,278,17040,261,17160,253.2L17280,245L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"></path></svg> */}
                <div className="image-container">
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <Paper elevation={0}>
                    <div className="cards">
                        <div className="item">
                            <Paper elevation={24} className="card">
                                <Link to={(loggedIn && loggedIn.data) ? "matches" : "login"} className= "first" style={{textDecoration: "none", color: "white"}}>
                                    <div className="cardIcon">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="svg-blob">
                                        <path className="blob" d="M56.5,-51.1C72.4,-40.5,84.2,-20.2,84.3,0.1C84.4,20.4,72.7,40.8,56.7,52.4C40.8,64,20.4,67,4.3,62.7C-11.8,58.4,-23.6,46.9,-39.3,35.2C-55,23.6,-74.5,11.8,-79.8,-5.2C-85,-22.2,-75.8,-44.5,-60.1,-55.1C-44.5,-65.7,-22.2,-64.7,-1,-63.7C20.2,-62.7,40.5,-61.7,56.5,-51.1Z" transform="translate(100 100)" />
                                        </svg>
                                        <i className="fas fa-users"/>
                                    </div>
                                    <h3>Find new friends</h3>
                                </Link>
                            </Paper>
                            <img className="smaller-podium" src={podium} alt="podium" data-aos="fade-up" />
                        </div>

                        <div className="item">
                            <Paper elevation={24} className="card">
                                <Link to={(loggedIn && loggedIn.data) ? "stats" : "login"} className="second" style={{textDecoration: "none", color: "white", background: "transparent"}}>
                                    <div className="cardIcon">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="svg-blob">
                                        <path className="blob" d="M45.8,-48.8C61.6,-41.2,78.5,-29,83.4,-13C88.3,3.1,81.2,23,69.9,38.3C58.6,53.7,43,64.6,28.2,64.4C13.3,64.1,-0.9,52.8,-17.4,47.1C-34,41.4,-52.8,41.4,-65.2,31.9C-77.5,22.4,-83.3,3.3,-77.8,-11.3C-72.4,-26,-55.7,-36.2,-40.9,-44C-26,-51.8,-13,-57.1,1,-58.3C14.9,-59.4,29.9,-56.4,45.8,-48.8Z" transform="translate(100 100)" />
                                        </svg>
                                        <i className="fas fa-chart-line"/>
                                    </div>
                                    <h3>Check your stats</h3>
                                </Link>
                            </Paper>
                            <img className="podium" src={podium} alt="podium" data-aos="fade-up" />
                        </div>

                        <div className="item">
                            <Paper elevation={24} className="card">
                                <Link to={(loggedIn && loggedIn.data) ? "stats" : "login"} className="third" style={{textDecoration: "none", color: "white", background: "transparent"}}>
                                    <div className="cardIcon">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="svg-blob">
                                        <path className="blob" d="M57,-37.8C70.8,-28.2,76.7,-4.7,70.5,13.4C64.2,31.5,45.8,44.2,29,47.4C12.2,50.6,-3.1,44.4,-22.9,38.4C-42.8,32.4,-67.2,26.7,-72.2,13.9C-77.1,1.2,-62.5,-18.5,-47.2,-28.4C-31.9,-38.4,-16,-38.6,2.8,-40.9C21.6,-43.2,43.2,-47.4,57,-37.8Z" transform="translate(100 100)" />
                                        </svg>
                                        <i className="fas fa-trophy"></i>
                                    </div>
                                    <h3>Check your friend's stats</h3>
                                </Link>
                            </Paper>
                            <img className="smaller-podium" src={podium} alt="podium" data-aos="fade-up" />
                        </div>
                    </div>
                </Paper>
            </ThemeProvider>
        </div>
    )
}

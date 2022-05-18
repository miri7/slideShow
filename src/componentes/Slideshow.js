import React, {useRef, useEffect} from 'react';
import img1 from './../img/1.jpg'
import img2 from './../img/2.jpg'
import img3 from './../img/3.jpg'
import img4 from './../img/4.jpg'
import {ReactComponent as FlechaIzquierda} from './../img/iconmonstr-angel-left-thin.svg'
import {ReactComponent as FlechaDerecha} from './../img/iconmonstr-angel-right-thin.svg'
import styled from 'styled-components'



const Slideshow = () =>{
// iconmonster
// unsplash
// guardar la ubicacion de la renderizacion 
    const slideshow = useRef(null);
    const intervaloSlideShow = useRef(null)

//permite traer la referencia previa del slideshow
    const siguiente = () =>{
        // comprobamos que el slideshow tenga elementos
        if(slideshow.current.children.length>0){
            console.log(siguiente)
            // obtenemos el primer elemento 
            const primerElemento = slideshow.current.children[0];
            // establecemos la transicion para el slideshow
            slideshow.current.style.transition = `300ms ease-out all`

            const tamanoSlide = slideshow.current.children[0].offsetWidth;

            // movemos el slideshow
            slideshow.current.style.transform = `translateX(-${tamanoSlide}px)`

            const transicion = ()=>{
                // reiniciamos la posicion del slideshow
                slideshow.current.style.transition = 'none';
                slideshow.current.style.transform = 'translateX(0)'

                // tomamos el primer elemento y lo mandamos al final

                slideshow.current.appendChild(primerElemento)

                slideshow.current.removeEventListener('transitionend', transicion);

            }

            // eventelistener para cuando termina la animacion
            slideshow.current.addEventListener('transitionend', transicion)
        }
    }
    const anterior = () =>{
        console.log('anterior');
        if(slideshow.current.children.length>0){
            // obtener el ultimo del elemento del slideshow
            const index = slideshow.current.children.length -1
            const ultimoElemento = slideshow.current.children[index];
            slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild)

            slideshow.current.style.transition = 'none';
            const tamanoSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${tamanoSlide}px)`

            setTimeout(()=>{
                slideshow.current.style.transition = '300ms ease-out all';
                slideshow.current.style.transform = `translateX(0)`
            })
        }
    }

    // cambia cada 5 segundos 

    // useEffect(()=>{
    //     const intervaloSlideShow = setInterval(()=>{
    //         siguiente();
    //     },5000)

    //     // eliminando el intervalo
    //     slideshow.current.addEventListener('mouseenter', () =>{
    //         clearInterval(intervaloSlideShow )
    //     })

    //     // volvemos a poner el intervalo cuando saquen el curso del slideshow
    //     // slideshow.current.addEventListener('mouseleave', ()=>{
    //     //     intervaloSlideShow.current = setInterval(()=>{
    //     //         siguiente();
    //     //     },5000)
    //     // })

    // },[])

    return(
        
        <ContenedorPrincipal>
             {/* referencia a todo este slideshow */}
            <ContenedorSlideshow ref={slideshow}>
                <Slide>
                    <a href = "https://www.google.com/">
                        <img src={img1} alt=''/>
                    </a>
                    <TextoSlide colorFondo="navy" colorTexto="white">
                        <p>15% descuento en productos Apple</p>
                    </TextoSlide>
                </Slide>
                <Slide>
                    <a href = "https://www.google.com/">
                        <img src={img2} alt=''/>
                    </a>
                    <div>
                        <h1>Crew</h1>
                        <p>lista de regalos para el grupo crew</p>
                        <row >
                            <button>deportes de riesgo</button>
                            <button>libros</button>
                        </row>
                    </div>
                    <TextoSlide>
                        <p>15% descuento en productos Apple</p>
                    </TextoSlide>
                </Slide>
                <Slide>
                    <a href = "https://www.google.com/">
                        <img src={img3} alt=''/>
                    </a>
                    <TextoSlide>
                        <p>15% descuento en productos Apple</p>
                    </TextoSlide>
                </Slide>
                <Slide>
                    <a href = "https://www.google.com/">
                        <img src={img4} alt=''/>
                    </a>
                    <TextoSlide>
                        <p>15% descuento en productos Apple</p>
                    </TextoSlide>
                </Slide>
            </ContenedorSlideshow>
            <Controles>
                <Boton onClick={anterior}>
                    <FlechaIzquierda/>
                </Boton>
                <Boton derecho onClick={siguiente}>
                    <FlechaDerecha/>
                </Boton >
            </Controles>
        </ContenedorPrincipal>

    )
    
}

const ContenedorPrincipal = styled.div`
    position:relative;


`;
const ContenedorSlideshow = styled.div `
    display : flex;
    flex-wrap:nowrap;
`;

const Slide = styled.div `
    min-width : 100%;
    overflow : hidden;
    transition : .3s ease all;
    z-index :10;
    max-height:500px;
    position:relative;

    img{
        width: 100%;
        vertical-align:top;
    }
`;

const TextoSlide = styled.div `
    background: ${props => props.colorFondo ? props.colorFondo : 'rgba(0,0,0, .3)'};
    color:${props => props.colorTexto ? props.colorTexto : '#fff'};;
    width:100%;
    padding: 10px 60px;
    text-align:center;
    position:absolute;
    bottom:0;
    @media screen and (max-width: 700px){
        position:relative;
        background:#000;
    }
`
const Controles = styled.div`
    position:absolute;
    top:0;
    z-index :20;
    width : 100%;
    height : 100%;
    pointer-events:none;
`
const Boton = styled.button`
    pointer-events:all;
    background : none;
    border:none;
    cursor:pointer;
    outline:none;
    width:50px;
    height:100%;
    text-align:center;
    position:absolute;
    transition: .3s ease all;

    // &:hover {
    //     background:rgba(0,0,0, .2)
    //     path(
    //         fill:#fff;
    //     )
    // }
    path {
        filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)': 'drop-shadow(2px 0px 0px #fff)'}
    }

    ${ props => props.derecho ? 'right:0' : 'left:0' }
`
export default Slideshow;
import { forwardRef } from "react"

export const Overlay = forwardRef((props, ref) => {
  const screenW = document.body.clientWidth;

    return (
        <div
            ref={ref}
            className="absolute top-0 left-0 w-full overflow-hidden select-none z-20"
        >
            <div id="cover" className="w-full h-[100vh] bg-cristo-wp bg-no-repeat bg-cover bg-center object-cover flex flex-col items-center justify-center shadow-2xl relative">
                    

                <div id="page-title" className="p-4 mt-48 mx-4 text-white items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-8">
                        Cristo Redentor
                    </h1>

                    <p className="text-base md:text-2xl font-bold bg-sky-500 p-4 rounded-md">
                       Curiosidades de uma das 7 maravilhas do mundo
                    </p>
                </div>
            </div>

            <div id="map-presentation" className="w-full h-[200vh] flex flex-col items-center justify-center relative">

                <div id="map-presentation-1st" className="fixed bottom-[10%] w-[80%] px-8 py-4 bg-sky-500 rounded-md text-white opacity-0">
                    <h1 className="text-xl md:text-4xl font-bold mb-6">O Rio de Janeiro</h1>
                    <p className="text-justify">
                        O Rio de Janeiro, conhecido como a "Cidade Maravilhosa", é um destino fascinante que combina paisagens deslumbrantes, praias paradisíacas e uma cultura vibrante. Com suas montanhas imponentes, como o icônico Pão de Açúcar e o Corcovado, onde está o Cristo Redentor, oferece vistas panorâmicas de tirar o fôlego. 
                        { screenW > 758 &&  " Suas praias famosas, como Copacabana e Ipanema, são sinônimos de diversão, sol e mar. Além disso, o Rio é conhecido pelo seu carnaval exuberante, repleto de desfiles de escolas de samba e festas animadas. Com sua energia contagiante e beleza incomparável, o Rio de Janeiro é um destino imperdível para os amantes da cultura, natureza e diversão." }
                    </p>
                </div>

                <div id="map-zooming-to-christ" className="fixed bottom-[10%] w-[80%] p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <h1>
                        O Cristo Redentor está no topo do morro do Corcovado, há cerca de 710 metros de altura. Localizado na Floresta da Tijuca, oferece uma vista espetacular da cidade.
                    </h1>
                </div>
            </div>
            

            <div id="map-trigger" className="w-full h-[200vh] opacity-0 overflow-hidden">
              <h1 className="text-black text-2xl">Map trigger</h1>
            </div>

            <div id="show-animation-map" className="w-full h-[200vh] flex flex-col items-center justify-center relative"></div>

            <div id="from-above" className="w-full h-[200vh] flex flex-col items-center justify-center relative">
                <div id="map-turning-to-3d" className="fixed bottom-[10%] p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <h1>
                        A vista de cima
                    </h1>
                </div>
            </div>

            <div id="animation-showcase" className="w-full h-[300vh] flex flex-col items-center justify-center relative">
                <div id="christ-3d" className="fixed bottom-[10%] w-[80%] p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <p>
                        O Cristo Redentor é uma imponente estátua localizada no topo do morro do Corcovado, no Rio de Janeiro. 
                        A construção da estátua começou em 1922 e foi concluída em 1931.
                        Ela foi projetada pelo engenheiro Heitor da Silva Costa e esculpida por Paul Landowski, um escultor francês. 
                        A estátua possui 38 metros de altura, com mais 8 metros adicionais da base, totalizando uma altura de 46 metros.
                        Seus braços estendidos têm um alcance de 28 metros. A estrutura é feita de concreto armado e revestida por pedra-sabão.
                        O Cristo Redentor é um dos ícones mais reconhecidos do Brasil e atrai milhões de visitantes de todo o mundo.
                    </p>
                </div>
            </div>

            <div id="cristo-feet" className="w-full h-[200vh] flex flex-col items-center justify-center relative">
                <div id="feet-content" className="fixed bottom-[10%] w-[80%]  p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <p>
                        O pedestal do Cristo Redentor, que sustenta a estátua, possui uma altura de 8 metros.
                        Ele é feito de concreto armado revestido por pedra-sabão, assim como o restante da estátua.
                        { screenW > 758 && (
                            `No pedestal, há uma capela chamada Capela do Corcovado, onde são realizadas cerimônias religiosas.
                            Além disso, existem escadas e elevadores que levam os visitantes ao topo do morro do Corcovado para admirar a estátua e apreciar a vista panorâmica da cidade do Rio de Janeiro.
                            O pedestal também serve como uma plataforma de observação, proporcionando aos visitantes uma experiência única.`
                        )}
                    </p>
                </div>
            </div>

            <div id="cristo-torso" className="w-full h-[200vh] flex flex-col items-center justify-center relative">
                <div id="torso-content" className="fixed bottom-[10%] w-[80%] p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <p>
                        Os braços estendidos do Cristo têm um alcance de aproximadamente 28 metros, simbolizando a ideia de acolhimento e proteção.
                        A estrutura é feita de concreto armado, garantindo sua solidez e durabilidade. Detalhes como os músculos esculpidos no peito e abdômen adicionam uma sensação de realismo à estátua.
                        O torso do Cristo Redentor é uma representação majestosa e icônica da figura de Jesus Cristo.
                    </p>
                </div>
            </div>
            
            <div id="cristo-head" className="w-full h-[200vh] flex flex-col items-center justify-center relative">
                <div id="head-content" className="fixed bottom-[10%] w-[80%] p-4 bg-sky-500 rounded-md text-white opacity-0">
                    <p>
                        Com aproximadamente 3,75 metros de altura, a cabeça é esculpida com detalhes impressionantes, incluindo os traços faciais suaves e os olhos serenos. A estrutura é feita de concreto armado revestido por pedra-sabão, assim como o restante da estátua. 
                    </p>
                </div>
            </div>

            <div id="last" className="w-full h-[50vh] flex flex-col items-center justify-center opacity-0"></div>

            <footer className="w-full h-[100vh] flex flex-col items-center px-40 py-20 relative">

                <div className="absolute bottom-40 text-white text-center">
                    <span className="">autor</span>
                    <h1 className="text-4xl">Sergio Vieira</h1>
                    

                </div>

                
            </footer>
        </div>
    )
})


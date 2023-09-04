# Construindo um Questionário HTML, CSS e JavaScript.

![Tela inicial](./imagem/primeira_tela.png)

Lista de reprodução de vídeos: https://share.vidyard.com/watch/uY1mEnobLS442GXMrbS2Vv?

## Introdução do Trabalho Apresentado 

Nosso trabalho consistiu em criar uma pagina de questionarios fundamentados na pesquisa do Censo 2022.

Nosso intiuito é demonstrar o aprendizado de HTML, CSS e JavaScript, juntamente com os dados analisados do Censo 2022.

Fase de Construção ;

## 1. Criamos as Tela de HTML;

- End.html;
- Ranking.html;
- Game.html;
- Index.html;
  
## 2. Criamos as Funções em JavaScript;

- End.js;
- Packge.js;
- Questions.js;
- Ranking.js;
  
## 3. Criamos os arquivos de CSS;

- App.css;
- Game.css;

## 4. Armazenamento dos dados;
Para construção deste trabalho, tivemos 2 desafios;
- Como fariamos para armazenar as perguntas e as respostas?

R. Utilizamos o codigo .js para construir as perguntas e as funções conforme consultadas buscavam no arquivo as informações das nossas questões, conforme o trecho do codigo abaixo do arquivo questions.js;


##### Comando específico
	{
          question:
            	"Qual foi a cidade que teve maior aumento na região entre os dois censos?",
           	answer: 3,
      		choice1: "Tanque D'arca (AL) 172,2%",
     		choice2: "São Raimundo Nonato (PI), 153,78%",
      		choice3: "Extremoz (RN) 150,6%",
      		choice4: "Grajaú(MA), 162,8%"
   	 }
  




- Como fariamos para armazerar os pontos por jogadores e incluir em uma tabela o Ranking de pontuação?

R. Para resolver este desafio, optamos em utilizar o LocaStorage que mantém o dado gravado mesmo se o browser é fechado e reaberto. Isso facilita criar alguns comportamentos de interface durante o uso do usuário. E obviamente, nem preciso dizer, que não serve para gravar dados sensíveis.


# Etapas de Uso da Pagina;

## 1. Pagina Inicial;
![Tela inicial](./imagem/primeira_tela.png)

## 2. Incluir Nome do Jogador;

![Tela inicial](./imagem/NomeJogador.png)

## 3. Perguntas, barra de evolução da quantidade de perguntas e Total de Pontos;

![Tela inicial](./imagem/PerguntasBarradeEveolucao.png)

## 4. Escolha da resposta com Resultado Positivo;

![Tela inicial](./imagem/RespostaCorreta.png)

## 5. Escolha da resposta com Resultado Negativo;

![Tela inicial](./imagem/respostaErrada.png)

## 6. Final do Jogo com Pontuação individual;

![Tela inicial](./imagem/FinalJogo.png)

## 7. Pontuação com Ranking;

![Tela inicial](./imagem/Pontuação.png)





Modelo inspirado no projeto: 
https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript



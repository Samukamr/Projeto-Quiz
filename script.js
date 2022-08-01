// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // Posição da barrinha
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;



        document.querySelector('.scoreArea').style.display = 'none'; 
        document.querySelector('.questionArea').style.display = 'block';

        // Mostrar a pergunta
        document.querySelector('.question').innerHTML = q.question;

        // Mostrar as opções
        let optionsHtml = '';
        for(let i in q.options) {                      // deixar o N inteiro
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]} </div>`;
        }
        // Inserir na tela
        document.querySelector('.options').innerHTML = optionsHtml;

        // loop e evento de click
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        // acabou as questões
        finishQuiz();
    }
}

function optionClickEvent(e) { 
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    // questão certa ou errada
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    } 

    currentQuestion++; // somar com perguntas acertadas
    showQuestion(); // Atualizar toda a questão
}

function finishQuiz() {
    // Correct
    let points = Math.floor((correctAnswers / questions.length) * 100);

    // Conforme o resultado final
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    // Mensagem de acerto 
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    // Descrição de acertos e erros
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

     // block na area de resultado!
    document.querySelector('.scoreArea').style.display = 'block'; 
    // none na área de questões
    document.querySelector('.questionArea').style.display = 'none';
    // Finalizando a Bar 100%
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}
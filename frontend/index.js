import { backend } from 'declarations/backend';

let puzzle;

async function init() {
    puzzle = await backend.getPuzzlePublic(1);
    if (puzzle) {
        renderPuzzle(puzzle);
        renderClues(puzzle.clues);
    } else {
        console.error("Failed to load puzzle");
    }
}

function renderPuzzle(puzzle) {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';
    puzzle.grid.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell !== null) {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                input.addEventListener('input', handleInput);
                cellElement.appendChild(input);
            } else {
                cellElement.classList.add('blocked');
            }
            rowElement.appendChild(cellElement);
        });
        grid.appendChild(rowElement);
    });
}

function renderClues(clues) {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    acrossClues.innerHTML = '';
    downClues.innerHTML = '';

    clues.forEach(clue => {
        const li = document.createElement('li');
        li.textContent = `${clue.number}. ${clue.text}`;
        if (clue.direction === 'across') {
            acrossClues.appendChild(li);
        } else {
            downClues.appendChild(li);
        }
    });
}

async function handleInput(event) {
    const { value, dataset } = event.target;
    const { row, col } = dataset;
    if (value) {
        const isValid = await backend.validateAnswer(1, parseInt(row), parseInt(col), value.toUpperCase());
        event.target.classList.toggle('correct', isValid);
        event.target.classList.toggle('incorrect', !isValid);
    } else {
        event.target.classList.remove('correct', 'incorrect');
    }
}

init();

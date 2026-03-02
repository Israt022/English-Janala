const loadLesson = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data));
}

const loadLevelWord  = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-sm text-center py-10 px-5 m-5 space-y-4"
        card.innerHTML = `
            <h2 class="text-xl font-bold">${word.word}</h2>
            <p class="text-sm">Meaning/Pronunciation</p>
            <p class="font-bangla text-xl font-bold text-gray-600">"${word.meaning}/${word.pronunciation}"</p>
            <div class="flex justify-between items-center">
                <button class="bg-blue-300/50 px-3 py-3 rounded-md"><i class="fa-solid fa-circle-info"></i></button>

                <button class="bg-blue-300/50 px-3 py-3 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `
        wordContainer.append(card)
    });
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv)
    });

}

loadLesson();

const createElement = (arr) => {
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)

    return (htmlElement.join(" "));
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }else{
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLesson = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data));
}
const removeActive = () =>{
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    
    lessonBtn.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord  = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active');
        // console.log(clickBtn);
        displayLevelWord(data.data);
    })
}

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data);
}

/*
{word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}
*/
const displayWordDetail = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
        <div>
                <h2 class="text-2xl font-bold">
                    ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
                </h2>
            </div>
            <div>
                <h2 class="font-bold">
                    Meaning
                </h2>
                <p>${word.meaning}</p>
            </div>
            <div>
                <h2 class="font-bold">
                    Example
                </h2>
                <p>${word.sentence}</p>
            </div>
            <div>
                <h2 class="font-bold">
                    Synonym
                </h2>
                <div class="">${createElement(word.synonyms)}</div>
                
            </div>
    `;
    document.getElementById('word_modal').showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-4 py-4">
        <img src="./assets/alert-error.png" alt="" class="mx-auto />
            <p class="text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>`;
        manageSpinner(false);
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-sm text-center py-10 px-5 m-5 space-y-4"
        card.innerHTML = `
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-sm">Meaning/Pronunciation</p>
            <p class="font-bangla text-2xl font-medium text-gray-600">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-300/30 hover:bg-blue-300/90 px-3 py-3 rounded-md"><i class="fa-solid fa-circle-info"></i></button>

                <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-300/30 hover:bg-blue-300/90 px-3 py-3 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        `
        wordContainer.append(card)
    });
    manageSpinner(false)
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv)
    });

}

loadLesson();

document.getElementById('btn-search').addEventListener('click',()=>{
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    const url = 'https://openapi.programming-hero.com/api/words/all';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const allWord = data.data;
        const filterWord =allWord.filter(word => 
            word.word.toLowerCase().includes(searchValue)
        )
        displayLevelWord(filterWord);
        // console.log(filterWord);
    })
    // console.log(searchValue);
})

//set data
const form = document.querySelector('#add-idea');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let idea = document.querySelector('#idea')
	let category = document.querySelector('#category');
	db.collection("ideas").add({
		idea: idea.value,
		category: category.value
	}).then(() => {
		location.reload(true);
	});

	idea.value="";
	category.value="";
	//doesn't work. have to add it after collection.add
	//location.reload(true);
});


//get data
var list = document.querySelector('#ideas-list');

function render(doc){
	console.log(doc);
	let li = document.createElement('li');

	var idea = document.createElement('span');
	var category = document.createElement('span');
	var cross = document.createElement('div');

	

	li.setAttribute('item-id', doc.id);
	idea.textContent = doc.data().idea;
	category.textContent = doc.data().category;
	cross.textContent = 'x';

	li.appendChild(idea);
	li.appendChild(category);
	li.appendChild(cross);

	list.appendChild(li);

	cross.addEventListener('click', (e) => {
		var delID = e.target.parentElement.getAttribute('item-id');
		console.log(delID);
		db.collection("ideas").doc(delID).delete()
		.then(() => {
			location.reload(true);
		});
	});
}


db.collection("ideas").get().then((snap) => {
	snap.forEach((doc) => {
		render(doc);
	});
})
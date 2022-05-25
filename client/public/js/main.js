const tbody = document.querySelector('#tbody')
const form = document.querySelector('#form')
const form1 = document.querySelector('#form1')
const contactnameInput = document.querySelector('#usernameInput')
const NumberInput = document.querySelector('#numberInput')
const categoryInput = document.querySelector('#categoryInput')

async function renderContacts () {
	const contacts = await request('/contacts', 'GET')
	tbody.innerHTML = null
	for(let index in contacts) {
		const [
			tr,
			indexEl,
			userEl,
			numberEl,
			categoryEl,
			buttonEl,
			categorySelectEl,
			category1El,
			category2El,
			category3El,
			category4El,
			buttonRemoveEl
		] = createElements('tr', 'td', 'td', 'td', 'td', 'td', 'select', 'option', 'option', 'option', 'option', 'button')
		indexEl.textContent = +index + 1
		userEl.textContent = contacts[index].contactname
		numberEl.textContent = contacts[index].phonenamber
		//console.log(contacts[index])
		buttonRemoveEl.textContent = 'X'

		let categoryname = ["Oila a`zosi","Do`st","Hamkasb","Tanishim"]
		userEl.contentEditable = true
		numberEl.contentEditable = true

		
		category1El.textContent = "Oila a`zosi"
		category2El.textContent = "Do`st"
		category3El.textContent = "Hamkasb"
		category4El.textContent = "Tanishim"

		category1El.value = 1
		category2El.value = 2
		category3El.value = 3
		category4El.value = 4
		if(contacts[index].category_id === 1) category1El.selected = true
		if(contacts[index].category_id === 2) category2El.selected = true
		if(contacts[index].category_id === 3) category3El.selected = true
		if(contacts[index].category_id === 4) category4El.selected = true

		
	
		
		categorySelectEl.append(category1El, category2El,category3El, category4El)
		categoryEl.append(categorySelectEl)
		buttonEl.append(buttonRemoveEl)
		tr.append(indexEl, userEl, numberEl, categoryEl, buttonEl)
		tbody.append(tr)


		userEl.onkeypress = event => {
			if(!(event.keyCode === 13)) return
			userEl.textContent = userEl.textContent.trim()
			userEl.blur()
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}

		numberEl.onkeypress = event => {
			if(!(event.keyCode === 13)) return
			numberEl.textContent = numberEl.textContent.trim()
			numberEl.blur()
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}
		categorySelectEl.onchange = event => {
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}
		buttonRemoveEl.onclick = event => {
			tr.remove()
			deleteUser(contacts[index].contact_id)
		}
	}
}


async function changeUser (contact_id, contactname, phoneNamber, category_id) {
	let response = await request('/contacts', 'PUT', {
		contact_id,
		contactname,
		phoneNamber,
		category_id,
	})
	console.log(response)
}

async function deleteUser (contact_id) {
	let response = await request('/contacts', 'DELETE', {
		contact_id,
		deleted:true,
	})
}

form.onsubmit = async event => {
	event.preventDefault()
	if(!contactnameInput && !NumberInput && !categoryInput) return alert('Inputs must be filled!')
	let number = new RegExp(/^[+]{1}9989[012345789][0-9]{7}$/);
    if (!number.test(NumberInput.value) && NumberInput.value == null)return alert("You must enter number exemple : 998941234567 or enter nothing");
	if(categoryInput.value == "Oila a`zosi" ) category_id = 1;
	if(categoryInput.value == "Do`st" ) category_id = 2;
	if(categoryInput.value == "Hamkasb" ) category_id = 3;
	if(categoryInput.value == "Tanishim" ) category_id = 4;
	let contacts = await request('/contacts/search', 'POST',{
			contactname: contactnameInput.value,
			phoneNamber: NumberInput.value,
			category_id: category_id,
			deleted: false
		})
	

	contactnameInput.value = null
	NumberInput.value = null
	tbody.innerHTML = null
	
	for(let index in contacts) {
		const [
			tr,
			indexEl,
			userEl,
			numberEl,
			categoryEl,
			buttonEl,
			categorySelectEl,
			category1El,
			category2El,
			category3El,
			category4El,
			buttonRemoveEl
		] = createElements('tr', 'td', 'td', 'td', 'td', 'td', 'select', 'option', 'option', 'option', 'option', 'button')
		indexEl.textContent = +index + 1
		userEl.textContent = contacts[index].contactname
		numberEl.textContent = contacts[index].phonenamber
		//console.log(contacts[index])
		buttonRemoveEl.textContent = 'X'

		let categoryname = ["Oila a`zosi","Do`st","Hamkasb","Tanishim"]
		userEl.contentEditable = true
		numberEl.contentEditable = true

		
		category1El.textContent = "Oila a`zosi"
		category2El.textContent = "Do`st"
		category3El.textContent = "Hamkasb"
		category4El.textContent = "Tanishim"
	

		category1El.value = 1
		category2El.value = 2
		category3El.value = 3
		category4El.value = 4
	
		if(contacts[index].category_id === 1) category1El.selected = true
		if(contacts[index].category_id === 2) category2El.selected = true
		if(contacts[index].category_id === 3) category3El.selected = true
		if(contacts[index].category_id === 4) category4El.selected = true

		
		categorySelectEl.append(category1El, category2El,category3El, category4El)
		categoryEl.append(categorySelectEl)
		//console.log(categorySelectEl.value)
		buttonEl.append(buttonRemoveEl)
		tr.append(indexEl, userEl, numberEl, categoryEl, buttonEl)
		tbody.append(tr)


		userEl.onkeypress = event => {
			if(!(event.keyCode === 13)) return
			userEl.textContent = userEl.textContent.trim()
			userEl.blur()
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}

		numberEl.onkeypress = event => {
			if(!(event.keyCode === 13)) return
			numberEl.textContent = numberEl.textContent.trim()
			numberEl.blur()
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}
		categorySelectEl.onchange = event => {
			changeUser(contacts[index].contact_id, userEl.textContent,numberEl.textContent,categorySelectEl.value)
		}
		buttonRemoveEl.onclick = event => {
			tr.remove()
			deleteUser(contacts[index].contact_id)
		}
	}
}
	

form1.onsubmit = async event => {
	event.preventDefault()
	if(!contactnameInput || !NumberInput || !categoryInput) return alert('Inputs must be filled!')
	let number = new RegExp(/^[+]{1}9989[012345789][0-9]{7}$/);
    if (!number.test(NumberInput.value))return alert("You must enter number exemple : 998941234567");
	if(categoryInput.value == "Oila a`zosi" ) category_id = 1;
	if(categoryInput.value == "Do`st" ) category_id = 2;
	if(categoryInput.value == "Hamkasb" ) category_id = 3;
	if(categoryInput.value == "Tanishim" ) category_id = 4;
	let response = await request('/contacts', 'POST', {
		contactname: contactnameInput.value,
		phoneNamber: NumberInput.value,
		category_id: category_id,
		deleted: false
	})

	contactnameInput.value = null
	NumberInput.value = null
	categoryInput.value = null

	renderContacts()
}
renderContacts()
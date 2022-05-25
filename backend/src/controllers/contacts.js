
//const { fetch, fetchAll } = require('../postgres.js')
const GET = async (req,res) => {
    const contacts = await req.fetch(`
        select * from contacts where deleted = false
    `)
    return res.json(contacts)
}

const SELECT = async (req, res) => {
	const { contactname, phoneNamber , category_id } = req.body
	if(!contactname && !phoneNamber){
		//console.log(category_id)
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when $1 > 0 then category_id = $1 
			else true
		end and deleted = false
		`,category_id)
		//console.log(searchcontacts)
		return res.json(searchcontacts)
	}
	if(!contactname ){
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when length($1) > 0  then phoneNamber = $1 
			else true
		end 
		case
			when $1 > 0 then category_id = $1 
			else true
		end and deleted = false`, phoneNamber,category_id)
		return res.json(searchcontacts)
	}
	if(!contactname && !category_id){
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when length($1) > 0  then phoneNamber = $1 
			else true
		end 
		and deleted = false`, phoneNamber)
		return res.json(searchcontacts)
	}
	if(!phoneNamber && !category_id){
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when length($1) > 0  then contactname = $1 
			else true
		end 
		and deleted = false`,contactname)
		return res.json(
			searchcontacts)
	}
	if(!category_id){
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when length($1) > 0  then contactname = $1 
			else true
		end 
		case
			when length($2) > 0 then phoneNamber = $2 
			else true
		end and deleted = false`,contactname, phoneNamber)
		return res.json(searchcontacts)
	}
	if(!phoneNamber){
		const searchcontacts = await req.fetch(`
		select 
			*
		from contacts
		where
		case
			when length($1) > 0  then contactname = $1 
			else true
		end 
		case
			when $2 > 0 then category_id = $2
			else true
		end
		and deleted = false
		`,contactname,category_id)
		return res.json(searchcontacts)
	}
}
const POST = async (req, res) => {
	const { contactname, phoneNamber , category_id , deleted } = req.body

	const newContact = await req.fetch(`
		insert into contacts (
			contactname,
			phoneNamber,
			category_id,
			deleted 
		) values ($1, $2, $3,$4)
		returning contact_id,contactname, phoneNamber,category_id,deleted
	`, contactname, phoneNamber,category_id,deleted)
	
	const contacts = await req.fetch(`
	select * from contacts where deleted = false
	`)
//console.log(newContact)
	return res.json({
		status: 201,
		message: "The contact successfully added!",
		contacts,
	})
}
const DELETE = async(req,res)=>{

	const {contact_id,deleted } = req.body
	
	const updatedContact  = await req.fetch(`
	UPDATE contacts SET deleted = $1 WHERE contact_id = $2
	returning deleted
	`, deleted, contact_id)
	//console.log(updatedContact)
	const contacts = await req.fetch(`
	select * from contacts where deleted = false 
	`)
    return res.json(updatedContact) 
}

const UPDATE = async(req,res)=>{

	const {contact_id,contactname, phoneNamber , category_id } = req.body
	
	const updatedContact  = await req.fetch(`
	UPDATE contacts u SET 
		contactname = $2 ,
		phoneNamber = $3,
		category_id = $4
	WHERE contact_id = $1
	returning contactname,phoneNamber,category_id
	`, contact_id , contactname , phoneNamber , category_id)
	//console.log(updatedContact)
	const contacts = await req.fetch(`
	select * from contacts where deleted = false 
	`)
    return res.json(contacts) 
}

module.exports = {
	GET,
	POST,
	DELETE,
	UPDATE,
	SELECT
}

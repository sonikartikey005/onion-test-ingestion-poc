// Simple in-memory "Customer CRUD" store

function createCustomerStore() {
	const customers = new Map(); // id -> customer
	let nextId = 1;
	console.log("Testing here")

	function createCustomer({ name, email }) {
		if (!name) throw new Error("name is required");
		if (!email) throw new Error("email is required");

		const id = String(nextId++);
		const customer = { id, name, email };
		customers.set(id, customer);
		return customer;
	}

	function getCustomer(id) {
		return customers.get(String(id)) || null;
	}

	function updateCustomer(id, updates) {
		const key = String(id);
		const existing = customers.get(key);
		if (!existing) throw new Error("customer not found");

		const updated = {
			...existing,
			...updates,
			id: existing.id
		};

		if (!updated.name) throw new Error("name is required");
		if (!updated.email) throw new Error("email is required");

		customers.set(key, updated);
		return updated;
	}

	function deleteCustomer(id) {
		const key = String(id);
		return customers.delete(key);
	}

	function listCustomers() {
		return Array.from(customers.values());
	}

	return {
		createCustomer,
		getCustomer,
		updateCustomer,
		deleteCustomer,
		listCustomers
	};
}

module.exports = { createCustomerStore };

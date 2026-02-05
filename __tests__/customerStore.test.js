const { createCustomerStore } = require("../src/customerStore");

describe("CustomerStore", () => {
	test("creates and fetches a customer", () => {
		const store = createCustomerStore();
		const created = store.createCustomer({ name: "Alice", email: "alice@test.com" });

		expect(created.id).toBeDefined();
		expect(store.getCustomer(created.id)).toEqual(created);
	});

	test("updates a customer", () => {
		const store = createCustomerStore();
		const created = store.createCustomer({ name: "Bob", email: "bob@test.com" });

		const updated = store.updateCustomer(created.id, { name: "Bobby" });
		expect(updated.name).toBe("Bobby");
		expect(store.getCustomer(created.id).name).toBe("Bobby");
	});

	test("deletes a customer", () => {
		const store = createCustomerStore();
		const created = store.createCustomer({ name: "Cara", email: "cara@test.com" });

		const deleted = store.deleteCustomer(created.id);
		expect(deleted).toBe(true);
		expect(store.getCustomer(created.id)).toBe(null);
	});

	test("throws if creating customer without name", () => {
		const store = createCustomerStore();
		expect(() => store.createCustomer({ name: "", email: "x@test.com" })).toThrow("name is required");
	});
});

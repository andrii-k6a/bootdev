type User = {
    id: string;
    name: string;
    preferences: {
        theme: string;
        notifications: boolean;
    };
};

function printTheme(user: Partial<User>) {
    // Partial makes all top level props optional (like, id, name, preferences), but not nested.
    // If `preferences` is present, prefrences.theme and .notifications are still required
    if (user.preferences) {
        console.log(user.preferences.theme);
    }
}

printTheme({ preferences: { theme: "dark", notifications: false } });

interface BlogPost {
    title: string;
    content: string;
    tags?: string[];
    publishDate?: Date;
    author?: {
        id: string;
        name?: string;
    };
}

function printDetails(post: Required<BlogPost>) {
    // `Required` forces all properties of a type to be required, even those that were originally optional.
    // It only affects the top-level properties
    console.log(post);
}

printDetails({
    title: "Hello TypeScritp",
    content: "Not yet",
    tags: ["education"], // required
    publishDate: new Date(),
    author: {
        id: "foo",
        // note: name is missing
    }
});

interface UserProfile {
    id: string;
    name: string;
    preferences: {
        readonly theme: "light" | "dark";
        notifications: boolean;
    };
}

// all the top-level properties are readonly, preventing them from being reassigned after initialization
type ConstantUserProfile = Readonly<UserProfile>;


// Using a union of literal types as keys
type PlayerRole = "tank" | "healer" | "dps";
type RoleCapacity = Record<PlayerRole, number>;

const partyRequirements: RoleCapacity = {
    tank: 1,
    healer: 2,
    dps: 3,
};

// TypeScript error if any role is missing
// Error: Property 'healer' is missing in type '{ tank: number; dps: number; }'
//
// const invalidRequirements: RoleCapacity = {
//     tank: 1,
//     dps: 3,
// };

// We can't add additional keys not in the union
// In TS strict mode it should: Error: Property 'support' does not exist on type 'RoleCapacity'
partyRequirements["support"] = 1;


interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
    images: string[];
    reviews: { user: string; rating: number; text: string }[];
}

// The Pick<T, K> utility type creates a new type by selecting a subset of properties from an existing type.
// Pick is very useful for creating quick types for functions that don't need everything from the original type.
type ProductSummary = Pick<Product, "id" | "name" | "price">;

const productList: ProductSummary[] = [
    { id: "p1", name: "Keyboard", price: 79.99 },
    { id: "p2", name: "Mouse", price: 59.99 },
];

const invalidProduct: ProductSummary = {
    id: "p3",
    name: "Headphones",
    price: 99.99,
    // TSC error:
    // Object literal may only specify known properties, and 'description' does not exist in type 'ProductSummary'.
    // description: "Noise cancelling headphones",
};

// The Omit<T, K> utility type is the opposite of Pick<T, K>. It creates a new type by excluding a set of properties from an existing type.
type PublicProduct = Omit<Product, "id" | "category" | "inStock">;

const publicProducts: PublicProduct[] = [
    {
        // id: "foo", // cannot have
        name: "Toy",
        price: 42,
        description: "car",
        images: [],
        reviews: []
    }
];


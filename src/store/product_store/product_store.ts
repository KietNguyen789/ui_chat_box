import { makeAutoObservable } from "mobx";
import type { ProductModelWithLike } from "../../pages/dashboard/product_component/productModel";

export const priceFilter = ["all", "<500K", "500K-1M", ">1M"];

function normalizeText(text: string) {
    return text
        .normalize("NFD")                     // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, "")     // Remove diacritics
        .toLowerCase()
        .trim();
}

class ProductStore {
    products: ProductModelWithLike[] = [];
    filteredProducts: ProductModelWithLike[] = [];
    searchQuery: string = '';
    priceFilter: string[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    getProduct(id: number): ProductModelWithLike | undefined {
        return this.products.find(product => product.id === id);
    }



    // Initialize products (e.g., from static list or API)
    setProducts(initialProducts: Omit<ProductModelWithLike, 'isLiked'>[]) {


        this.products = initialProducts.map(product => {
            const existingProduct = this.products.find(p => p.id === product.id);
            return {
                ...product,
                isLiked: existingProduct?.isLiked ?? false
            };
        });;
        this.filteredProducts = [...this.products];
    }
    setSearchQuery(query: string) {
        this.searchQuery = query.toLowerCase();


    }
    setPriceFilter(filter: any) {
        this.priceFilter = filter;
        console.log(this.priceFilter);
        console.log('is Array:', Array.isArray(filter));


    }
    get loveProducts() {
        return this.products.filter(product => product.isLiked);
    }

    getfilteredProducts() {
        const normalizedQuery = normalizeText(this.searchQuery);

        this.filteredProducts = this.products.filter(product => {
            const normalizedName = normalizeText(product.name);
            const matchName = normalizedQuery === '' || normalizedName.includes(normalizedQuery);


            // Skip price filtering if 'all' is selected
            if (this.priceFilter.includes("all")) {
                return matchName;
            }
            // Check if any of the selected price ranges match the product
            const matchPrice = this.priceFilter.some(priceRange => {
                switch (priceRange) {
                    case "<500K":
                        return product.price < 500_000;
                    case "500K-1M":
                        return product.price >= 500_000 && product.price <= 1_000_000;
                    case ">1M":
                        return product.price > 1_000_000;
                    default:
                        return false;
                }
            });

            const nofilter = this.priceFilter.length === 0;

            return matchName && (matchPrice || nofilter);
        });
        console.log('Filtered products:', this.filteredProducts);

    }

    showProduct() {
        console.log('filter Products:', this.filteredProducts);

    }

    toggleLike(productId: number) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.isLiked = !product.isLiked;
        }
    }
}

export const productStore = new ProductStore();

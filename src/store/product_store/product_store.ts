import { makeAutoObservable } from "mobx";
import type { ProductModelWithLike } from "../../pages/dashboard/product_component/productModel";

export const priceFilter = ["all", "<500K", "500K-1M", ">1M"];
export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc';

const LIKED_KEY = 'liked_products';

function normalizeText(text: string) {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim();
}

class ProductStore {
    products: ProductModelWithLike[] = [];
    filteredProducts: ProductModelWithLike[] = [];
    searchQuery: string = '';
    priceFilter: string[] = [];
    sortBy: SortOption = 'default';

    constructor() {
        makeAutoObservable(this);
    }

    getProduct(id: number): ProductModelWithLike | undefined {
        return this.products.find(product => product.id === id);
    }

    setProducts(initialProducts: Omit<ProductModelWithLike, 'isLiked'>[]) {
        const savedLiked: number[] = JSON.parse(localStorage.getItem(LIKED_KEY) || '[]');
        this.products = initialProducts.map(product => ({
            ...product,
            isLiked: savedLiked.includes(product.id),
        }));
        this.filteredProducts = [...this.products];
    }

    setSearchQuery(query: string) {
        this.searchQuery = query.toLowerCase();
        this.getfilteredProducts();
    }

    setPriceFilter(filter: string[]) {
        this.priceFilter = filter;
        this.getfilteredProducts();
    }

    setSortBy(sort: SortOption) {
        this.sortBy = sort;
        this.getfilteredProducts();
    }

    get loveProducts() {
        return this.products.filter(product => product.isLiked);
    }

    getfilteredProducts() {
        const normalizedQuery = normalizeText(this.searchQuery);

        this.filteredProducts = this.products.filter(product => {
            const normalizedName = normalizeText(product.name);
            const matchName = normalizedQuery === '' || normalizedName.includes(normalizedQuery);

            if (this.priceFilter.includes("all") || this.priceFilter.length === 0) {
                return matchName;
            }

            const matchPrice = this.priceFilter.some(priceRange => {
                switch (priceRange) {
                    case "<500K": return product.price < 500_000;
                    case "500K-1M": return product.price >= 500_000 && product.price <= 1_000_000;
                    case ">1M": return product.price > 1_000_000;
                    default: return false;
                }
            });

            return matchName && matchPrice;
        });

        switch (this.sortBy) {
            case 'price_asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name_asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
                break;
        }
    }

    toggleLike(productId: number) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.isLiked = !product.isLiked;
            const likedIds = this.products.filter(p => p.isLiked).map(p => p.id);
            localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
        }
    }

    showProduct() {
        console.log('filter Products:', this.filteredProducts);
    }
}

export const productStore = new ProductStore();

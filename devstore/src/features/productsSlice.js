import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 30+ Robust fallback products with working images
const fallbackProducts = [
    // Men's Clothing
    { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack", price: 109.95, description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop in the padded sleeve.", category: "men's clothing", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60", rating: { rate: 3.9, count: 120 } },
    { id: 2, title: "Mens Casual Premium Slim Fit T-Shirt", price: 22.30, description: "Slim-fitting style, contrast raglan long sleeve, lightweight and soft fabric for breathable wear.", category: "men's clothing", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.1, count: 259 } },
    { id: 3, title: "Mens Cotton Jacket", price: 55.99, description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for working, hiking, and camping.", category: "men's clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.7, count: 500 } },
    { id: 4, title: "Mens Casual Slim Fit", price: 15.99, description: "The color could be slightly different between on the screen and in practice.", category: "men's clothing", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60", rating: { rate: 2.1, count: 430 } },
    { id: 5, title: "Classic Bomber Flight Jacket", price: 79.99, description: "Warm windproof rib collar cuffs hem vintage flight jacket for casual winter wear.", category: "men's clothing", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.5, count: 180 } },
    { id: 6, title: "Urban Streetwear Hoodie", price: 45.00, description: "Heavyweight fleece hoodie designed for comfort during coding sessions and chilly nights.", category: "men's clothing", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.8, count: 310 } },
    { id: 7, title: "Performance Athletic Joggers", price: 34.99, description: "Flexible moisture-wicking joggers for gym workouts or relaxed home coding sprints.", category: "men's clothing", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.2, count: 95 } },
    { id: 8, title: "Formal Business Oxford Shirt", price: 42.50, description: "Crisp cotton button-down shirt tailored for professional meetings and tech interviews.", category: "men's clothing", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.0, count: 140 } },

    // Electronics
    { id: 9, title: "Silicon Power 256GB SSD 3D NAND", price: 109.00, description: "3D NAND flash are applied to deliver high transfer speeds and better overall system performance.", category: "electronics", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.8, count: 319 } },
    { id: 10, title: "WD 4TB Gaming Drive for Playstation", price: 114.99, description: "Expand your gaming experience, play anywhere fast and easy with high capacity storage.", category: "electronics", image: "https://images.unsplash.com/photo-1531492736222-1f7c35272a80?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.8, count: 400 } },
    { id: 11, title: "Acer SB220Q bi 21.5 inches Full HD Monitor", price: 599.00, description: "21.5 inches Full HD widescreen display featuring IPS technology and Radeon FreeSync.", category: "electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60", rating: { rate: 2.9, count: 250 } },
    { id: 12, title: "Samsung 49-Inch CHG90 Curved Gaming Monitor", price: 999.99, description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.", category: "electronics", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.9, count: 350 } },
    { id: 13, title: "Mechanical RGB Gaming Keyboard", price: 89.99, description: "Hot-swappable mechanical switches with customizable RGB backlighting and aluminum frame.", category: "electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.7, count: 412 } },
    { id: 14, title: "Ergonomic Wireless Vertical Mouse", price: 49.99, description: "Designed to reduce wrist strain with natural handshake positioning and optical tracking.", category: "electronics", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.4, count: 188 } },
    { id: 15, title: "Noise-Cancelling Wireless Headphones", price: 199.99, description: "Immersive active noise cancellation with 40-hour battery life and ultra-soft memory foam earcups.", category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.8, count: 620 } },
    { id: 16, title: "USB-C Multi-Port Hub Adapter", price: 35.99, description: "Includes 4K HDMI, 3x USB 3.0 ports, SD card reader, and 100W Power Delivery pass-through.", category: "electronics", image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.6, count: 230 } },

    // Women's Clothing
    { id: 17, title: "Rain Jacket Women Windbreaker", price: 39.99, description: "Lightweight perfect for trip or casual wear with hood and drawstring waist.", category: "women's clothing", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60", rating: { rate: 3.8, count: 679 } },
    { id: 18, title: "MBJ Women's Solid Short Sleeve V Neck", price: 9.85, description: "95% rayon 5% spandex, lightweight soft fabric with stretch.", category: "women's clothing", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.7, count: 130 } },
    { id: 19, title: "Opna Women's Short Sleeve Moisture Athletic Shirt", price: 7.95, description: "100% polyester lightweight roomy and breathable activewear top.", category: "women's clothing", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.5, count: 146 } },
    { id: 20, title: "DANVOUY Womens Casual Cotton T Shirt", price: 12.99, description: "Casual letter print short sleeve t-shirt tee top for everyday wear.", category: "women's clothing", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60", rating: { rate: 3.6, count: 145 } },
    { id: 21, title: "Oversized Knit Pullover Sweater", price: 48.00, description: "Cozy ribbed knit sweater with relaxed drop shoulders for chilly weather comfort.", category: "women's clothing", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.6, count: 210 } },
    { id: 22, title: "High-Waisted Yoga Leggings", price: 29.99, description: "Buttery soft non-see-through active leggings with convenient side pockets.", category: "women's clothing", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.9, count: 540 } },
    { id: 23, title: "Bohemian Floral Midi Wrap Dress", price: 52.00, description: "V-neck ruffle hem lightweight summer wrap dress suitable for outdoor events.", category: "women's clothing", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.3, count: 185 } },

    // Jewelry
    { id: 24, title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet", price: 695.00, description: "From the Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.", category: "jewelery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.6, count: 400 } },
    { id: 25, title: "Solid Gold Petite Micropave Ring", price: 168.00, description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in United States.", category: "jewelery", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60", rating: { rate: 3.9, count: 70 } },
    { id: 26, title: "White Gold Plated Princess Ring", price: 9.99, description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to Spoils.", category: "jewelery", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60", rating: { rate: 3.0, count: 400 } },
    { id: 27, title: "Pierced Owl Rose Gold Plated Stainless Steel Double", price: 10.99, description: "Rose Gold Plated Double Flared Tunnel Plug. Made of 316L Stainless Steel.", category: "jewelery", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60", rating: { rate: 1.9, count: 100 } },
    { id: 28, title: "Minimalist Sterling Silver Pendant Necklace", price: 45.00, description: "Dainty geometric sterling silver necklace designed for daily elegant wear.", category: "jewelery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.7, count: 115 } },
    { id: 29, title: "Classic Hoop Earrings in 14K Gold", price: 85.00, description: "Lightweight hollow tube gold hoop earrings with secure click-top closure.", category: "jewelery", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&auto=format&fit=crop&q=60", rating: { rate: 4.8, count: 220 } },
];

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error('API offline');
            const data = await response.json();
            return [...data, ...fallbackProducts.slice(15)];
        } catch (error) {
            return fallbackProducts;
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        selectedCategory: 'all',
        searchQuery: '',
    },
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'succeeded';
                state.items = fallbackProducts;
            });
    },
});

export const { setCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
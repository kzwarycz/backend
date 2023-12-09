import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful' });
        console.log('Login successful');
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const menus = {
    meksykanska: [
        { name: 'Taco', price: 5 },
        { name: 'Burrito', price: 7 },
        { name: 'Nachos', price: 6 },
        { name: 'Quesadilla', price: 6 },
        { name: 'Chiles Rellenos', price: 8 },
        { name: 'Enchiladas', price: 9 },
        { name: 'Tamale', price: 4 },
        { name: 'Carnitas', price: 10 },
        { name: 'Guacamole', price: 3 },
        { name: 'Churros', price: 4 }
    ],
    polska: [
        { name: 'Pierogi', price: 6 },
        { name: 'Bigos', price: 8 },
        { name: 'Kotlet Schabowy', price: 9 },
        { name: 'Zurek', price: 5 },
        { name: 'Golabki', price: 7 },
        { name: 'Kielbasa', price: 8 },
        { name: 'Barszcz', price: 5 },
        { name: 'Placki Ziemniaczane', price: 6 },
        { name: 'Kaczka z Jabłkami', price: 10 },
        { name: 'Sernik', price: 4 }
    ],
    wloska: [
        { name: 'Pizza', price: 10 },
        { name: 'Pasta', price: 12 },
        { name: 'Tiramisu', price: 5 },
        { name: 'Risotto', price: 11 },
        { name: 'Lasagna', price: 13 },
        { name: 'Gelato', price: 4 },
        { name: 'Bruschetta', price: 7 },
        { name: 'Focaccia', price: 5 },
        { name: 'Carbonara', price: 12 },
        { name: 'Osso Buco', price: 14 }
    ],
    amerykanska: [
        { name: 'Burger', price: 8 },
        { name: 'Fries', price: 4 },
        { name: 'Milkshake', price: 6 },
        { name: 'Hot Dog', price: 5 },
        { name: 'BBQ Ribs', price: 12 },
        { name: 'Fried Chicken', price: 9 },
        { name: 'Mac and Cheese', price: 7 },
        { name: 'Pancakes', price: 6 },
        { name: 'Cheesecake', price: 5 },
        { name: 'Apple Pie', price: 4 }
    ]
};

let cart = [];

app.post('/cart', (req, res) => {
    const { restaurant, itemName } = req.body;
    const item = menus[restaurant].find(i => i.name === itemName);
    if (item) {
        const existingItem = cart.find(i => i.name === itemName && i.restaurant === restaurant);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...item, restaurant, quantity: 1 });
        }
        console.log('Cart:', cart);
        res.json({ message: 'Dodano do koszyka' });
    } else {
        res.status(404).json({ message: 'Nie znaleziono przedmiotu' });
    }
});

app.patch('/cart/remove-one/:itemName', (req, res) => {
    const { itemName } = req.params;
    const itemIndex = cart.findIndex(i => i.name === itemName);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart = cart.filter((i, index) => index !== itemIndex);
        }
        res.json({ message: 'Item removed from cart' });
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
 }); 

app.get('/cart', (req, res) => {
    res.json({ cart });
});

app.post('/order/place', (req, res) => {
    const { cart } = req.body;
    console.log('Order placed:', cart);
    res.json({ message: 'Order placed successfully' });
  });
  

app.get('/:restaurant', (req, res) => {
    const { restaurant } = req.params;
    console.log(restaurant)
    if (menus[restaurant]) {
        res.json({ menu: menus[restaurant] });
    } else {
        res.status(404).send('Restaurant not found');
    }
});

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::truncate();
        $products = [
            ['name' => 'Shoes', 'detail' => 'Premium quality running shoes with excellent comfort and durability.', 'price' => 3000, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop', 'type' => 'fashion'],
            ['name' => 'Mobile', 'detail' => 'Latest smartphone with high-performance processor, 128GB storage.', 'price' => 50000, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop', 'type' => 'electronics'],
            ['name' => 'Watch', 'detail' => 'Elegant analog watch with Swiss movement.', 'price' => 7000, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=200&fit=crop', 'type' => 'fashion'],
            ['name' => 'Jacket', 'detail' => 'Premium leather jacket with stylish design.', 'price' => 9000, 'author' => 'Admin', 'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFmh9xSvgiZ_JjuP6dE5jrOd2jHjPRydopQ&s', 'type' => 'fashion'],
            ['name' => 'Winter Parka', 'detail' => 'Insulated winter parka designed for extreme cold.', 'price' => 12000, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=200&fit=crop', 'type' => 'fashion'],
            ['name' => 'Denim Jacket', 'detail' => 'Classic denim jacket with a timeless look.', 'price' => 5500, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&h=400&fit=crop', 'type' => 'fashion'],
            ['name' => 'Bomber Jacket', 'detail' => 'Versatile bomber jacket with a modern fit.', 'price' => 8500, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=400&fit=crop', 'type' => 'fashion'],
            ['name' => 'Windbreaker', 'detail' => 'Breathable windbreaker jacket ideal for outdoor activities.', 'price' => 4000, 'author' => 'Admin', 'image' => 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?w=500&h=400&fit=crop', 'type' => 'fashion'],
        ];

        foreach($products as $p){
            Product::create($p);
        }
    }
}




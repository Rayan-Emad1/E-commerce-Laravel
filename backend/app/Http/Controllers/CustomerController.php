<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class CustomerController extends Controller
{
    public function getProducts(){

        $products = Product::all();

        $response = [];

        // Loop through each product and build the desired structure
        foreach ($products as $product) {
            // Retrieve the corresponding category for each product
            $category = Category::find($product->id_category);

            // Build the product info array
            $productInfo = [
                'title' => $product->title,
                'description' => $product->description,
                'product_image' => $product->product_image,
                'id' => $product->id,
                'id_category' => $product->id_category,
                'category_name' => $category ? $category->name : null,
            ];

            $response[] = $productInfo;
        }

        // Return the response containing all the products' information
        return response()->json(['products' => $response]);
    }

}

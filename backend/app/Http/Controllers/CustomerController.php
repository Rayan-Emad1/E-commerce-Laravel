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

        foreach ($products as $product) {
            $id = $product->id_category;
            $category = Category::where("id_category", $id)->get()[0];
            
            $productInfo = [
                'id' => $product->id_product,
                'title' => $product->title,
                'description' => $product->description,
                // 'product_image' => $product->product_image,
                'category_name' => $category ? $category->category : null,
            ];

            $response[] = $productInfo;
        }

        return response()->json(['products' => $response]);
    }

}

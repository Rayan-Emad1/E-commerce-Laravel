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
            $category = Category::where("id_category", $id)->first();

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

    public function getProduct(Request $request){
        $categoryTitle = $request->category ?? '';
        $title = $request->title ?? '';
    
        $query = Product::query();
    
        if ($categoryTitle) {
            $category = Category::where("category", "LIKE", "%$categoryTitle%")->first();
            // dd($categoryTitle, $category);
            if ($category) {
                $query->where('id_category', $category->id_category);
                // dd($query->toSql(), $query->getBindings());
            }else {
                return response()->json(['products' => []]);
            }
             
        }
    
        if ($title) {
            $query->where(function ($q) use ($title) {
                $q->where('title', 'LIKE', "%$title%")
                  ->orWhere('description', 'LIKE', "%$title%");
            });
        }
    
        $products = $query->get();
        //Read the SQL
        // dd($query->toSql(), $query->getBindings());
        $response = [];

        foreach ($products as $product) {
            $category = Category::where("id_category", $product->id_category)->first();
    
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
